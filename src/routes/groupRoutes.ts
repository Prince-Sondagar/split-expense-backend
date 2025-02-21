import { Router } from "express";
import { createGroupController } from "../controllers/groupController";
import { createGroupValidator } from "../validators/groupValidator";
import { validateRequest } from "../middleware/validateRequest";
import AuthMiddleWare from "../middleware/authMiddleware";


const router = Router();


router.post('/', AuthMiddleWare, createGroupValidator, validateRequest, createGroupController);



export default router;