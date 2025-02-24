import { Router } from "express";
import { createGroupController, viewGroupController } from "../controllers/groupController";
import { createGroupValidator, viewSpecificGroupValidator } from "../validators/groupValidator";
import { validateRequest } from "../middleware/validateRequest";
import AuthMiddleWare from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";


const router = Router();


router.post('/', AuthMiddleWare, upload.single('groupImage'), validateRequest(createGroupValidator), createGroupController);

router.get('/viewgroup/:id', AuthMiddleWare, validateRequest(viewSpecificGroupValidator), viewGroupController);



export default router;