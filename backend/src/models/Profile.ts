import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Sharvil Waghmare' },
  title: { type: String, default: 'Computer Engineering Student' },
  email: { type: String, default: 'sharvilwaghmare113@gmail.com' },
  phone: { type: String, default: '+91 8767649906' },
  location: { type: String, default: 'Talegaon, Pune' },
  bio: { type: String, default: '' },
  aboutText: { type: String, default: '' },
  aboutHighlight: { type: String, default: '' },
  heroTagline: { type: String, default: '' },
  resumeUrl: { type: String, default: '/resume.pdf' },
  githubUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  profileImage: { type: String, default: '/profile.png' },
  yearsExperience: { type: String, default: '2+' },
  projectsCount: { type: String, default: '10+' },
  availableFor: { type: String, default: 'Internship' }
}, { timestamps: true });

export const Profile = mongoose.model('Profile', profileSchema);
