import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String, default: '#' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export const Certification = mongoose.model('Certification', certificationSchema);
