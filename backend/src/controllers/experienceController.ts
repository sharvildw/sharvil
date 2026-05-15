import { Request, Response } from 'express';
import { Experience } from '../models/Experience';

export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find({}).sort({ order: 1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json(experience);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
