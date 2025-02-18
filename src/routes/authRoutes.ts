import express, { Router } from 'express';
import { LoginController, registrationController } from '../controllers/authController';
import { userLoginValidator, userRegistrationValidator } from '../validators/userValidator';
import { validateRequest } from '../middleware/validateRequest';

const routes: Router = express.Router();

routes.post('/signUp', userRegistrationValidator, validateRequest, registrationController);
routes.post('/signIn', userLoginValidator, validateRequest, LoginController);


export default routes;