import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  type: { type: String, enum: ['education', 'experience'], required: true },
  title: { type: String, required: true },
  organization: { type: String, required: true },
  period: { type: String, required: true },       // e.g. "2024-28", "2026-Pres"
  description: [{ type: String }],                 // bullet points
  score: { type: String },                         // e.g. "8.86 SGPA", "93%"
  isCurrent: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export const Experience = mongoose.model('Experience', experienceSchema);
