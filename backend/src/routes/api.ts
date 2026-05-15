import express from 'express';
import { login, logout } from '../controllers/authController';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController';
import { getCertifications, createCertification, updateCertification, deleteCertification } from '../controllers/certificationController';
import { getMessages, createMessage, markMessageRead, deleteMessage, testEmail } from '../controllers/messageController';
import { getProfile, updateProfile } from '../controllers/profileController';
import { protect } from '../middlewares/auth';

const router = express.Router();

// Auth
router.post('/auth/login', login as any);
router.post('/auth/logout', logout as any);

// Projects
router.route('/projects')
  .get(getProjects as any)
  .post(protect as any, createProject as any);

router.route('/projects/:id')
  .put(protect as any, updateProject as any)
  .delete(protect as any, deleteProject as any);

// Skills
router.route('/skills')
  .get(getSkills as any)
  .post(protect as any, createSkill as any);

router.route('/skills/:id')
  .put(protect as any, updateSkill as any)
  .delete(protect as any, deleteSkill as any);

// Experience
router.route('/experiences')
  .get(getExperiences as any)
  .post(protect as any, createExperience as any);

router.route('/experiences/:id')
  .put(protect as any, updateExperience as any)
  .delete(protect as any, deleteExperience as any);

// Certifications
router.route('/certifications')
  .get(getCertifications as any)
  .post(protect as any, createCertification as any);

router.route('/certifications/:id')
  .put(protect as any, updateCertification as any)
  .delete(protect as any, deleteCertification as any);

// Messages (create is public, rest is protected)
router.get('/messages/test-email', testEmail as any);  // SMTP test
router.route('/messages')
  .get(protect as any, getMessages as any)
  .post(createMessage as any);

router.route('/messages/:id')
  .put(protect as any, markMessageRead as any)
  .delete(protect as any, deleteMessage as any);

// Profile (get is public, update is protected)
router.route('/profile')
  .get(getProfile as any)
  .put(protect as any, updateProfile as any);

export default router;
