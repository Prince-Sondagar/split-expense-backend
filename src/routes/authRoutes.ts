import express, { Router } from 'express';
import { registrationController } from '../controllers/authController';
import { userRegistrationValidator } from '../validators/userValidator';
import { validateRequest } from '../middleware/validateRequest';

const routes: Router = express.Router();

routes.post('/signUp', userRegistrationValidator, validateRequest, registrationController);

export default routes;