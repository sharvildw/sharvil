import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g. "Frontend", "Backend & Database"
  icon: { type: String, default: 'Code2' },   // lucide icon name
  color: { type: String, default: 'from-blue-500 to-cyan-400' }, // gradient classes
  skills: [{
    name: { type: String, required: true },
    level: { type: Number, required: true, min: 0, max: 100 }
  }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

export const Skill = mongoose.model('Skill', skillSchema);
