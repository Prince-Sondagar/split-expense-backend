import { Router } from "express";
import { createGroupController } from "../controllers/groupController";
import { createGroupValidator, viewSpecificGroupValidator } from "../validators/groupValidator";
import { validateRequest } from "../middleware/validateRequest";
import AuthMiddleWare from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";


const router = Router();


router.post('/', AuthMiddleWare, upload.single('groupImage'), validateRequest(createGroupValidator), createGroupController);

// router.get('/:id', AuthMiddleWare, validateRequest(viewSpecificGroupValidator),);


export default router;