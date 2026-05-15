import { Request, Response } from 'express';
import { Certification } from '../models/Certification';

export const getCertifications = async (req: Request, res: Response) => {
  try {
    const certifications = await Certification.find({}).sort({ order: 1 });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createCertification = async (req: Request, res: Response) => {
  try {
    const certification = await Certification.create(req.body);
    res.status(201).json(certification);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const updateCertification = async (req: Request, res: Response) => {
  try {
    const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!certification) return res.status(404).json({ message: 'Certification not found' });
    res.json(certification);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const deleteCertification = async (req: Request, res: Response) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    if (!certification) return res.status(404).json({ message: 'Certification not found' });
    res.json({ message: 'Certification deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
