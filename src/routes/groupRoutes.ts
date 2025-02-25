import { Router } from "express";
import { createGroupController, getAllGroupsController, getGroupByIdController, updateGroupController } from "../controllers/groupController";
import { createGroupValidator, viewSpecificGroupValidator, updateGroupValidator } from "../validators/groupValidator";
import { validateRequest } from "../middleware/validateRequest";
import AuthMiddleWare from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";


const router = Router();


router.post('/', AuthMiddleWare, upload.single('groupImage'), validateRequest(createGroupValidator), createGroupController); // create group

router.get('/', AuthMiddleWare, getAllGroupsController); // get all groups

router.get('/:id', AuthMiddleWare, validateRequest(viewSpecificGroupValidator), getGroupByIdController); // get groups details by Id

router.post('/update', AuthMiddleWare, validateRequest(updateGroupValidator), updateGroupController); // update groups

export default router;