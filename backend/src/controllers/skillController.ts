import { Request, Response } from 'express';
import { Skill } from '../models/Skill';

export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find({}).sort({ order: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
