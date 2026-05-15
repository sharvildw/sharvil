const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const mongoose = require('mongoose');

const destDir = path.join('e:', 'portfolio', 'frontend', 'public', 'certificates');

mongoose.connect('mongodb://localhost:27017/portfolio').then(async () => {
  const db = mongoose.connection.db;
  const certs = await db.collection('certifications').find().toArray();
  
  for (let cert of certs) {
    if (cert.link) {
      const filename = path.basename(cert.link);
      const filePath = path.join(destDir, filename);
      if (fs.existsSync(filePath)) {
        if (filename.endsWith('.pdf')) {
          try {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);
            const text = data.text;
            
            // Naive extraction logic for common certificates like HackerRank, Coursera, etc.
            let title = cert.title;
            let issuer = cert.issuer;
            
            if (text.includes('HackerRank') || text.includes('hackerrank')) {
               issuer = 'HackerRank';
               const lines = text.split('\n').map(l => l.trim()).filter(l => l);
               // Usually the certificate name is around "Certificate" or just after names
               // E.g. "React (Basic) Certificate"
               const match = text.match(/(.*?)\s+Certificate/i) || text.match(/(.*?)\s+Course/i);
               if (match && match[1]) {
                 title = match[1].trim().split('\n').pop() + ' Certificate';
               } else {
                 title = lines[2] || 'HackerRank Certificate';
               }
            } else if (text.includes('Coursera')) {
               issuer = 'Coursera';
               const lines = text.split('\n').map(l => l.trim()).filter(l => l);
               title = lines[3] || 'Coursera Certificate';
            } else if (text.includes('Udemy')) {
               issuer = 'Udemy';
               title = 'Udemy Certificate';
            } else {
               // generic text extraction
               const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 5);
               title = lines[0] || 'Certificate';
            }
            
            // Clean up title
            if (title.length > 50) title = title.substring(0, 50) + '...';
            
            await db.collection('certifications').updateOne({ _id: cert._id }, { $set: { title, issuer } });
            console.log(`Updated ${filename}: Title=${title}, Issuer=${issuer}`);
          } catch (e) {
            console.error(`Failed to parse ${filename}`, e.message);
          }
        } else {
           console.log(`${filename} is an image. Setting generic name.`);
           await db.collection('certifications').updateOne({ _id: cert._id }, { $set: { title: 'Certificate Image', issuer: 'Unknown' } });
        }
      }
    }
  }
  
  console.log('Done mapping names.');
  process.exit(0);
});
