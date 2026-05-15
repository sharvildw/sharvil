import { Request, Response } from 'express';
import { Profile } from '../models/Profile';

export const getProfile = async (req: Request, res: Response) => {
  try {
    let profile = await Profile.findOne({});
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    let profile = await Profile.findOne({});
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true });
    }
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};
