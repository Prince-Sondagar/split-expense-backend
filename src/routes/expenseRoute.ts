import { Router } from "express";
import AuthMiddleWare from "../middleware/authMiddleware";
import { createExpenseController } from "../controllers/expenseController";
import { createExpenseValidator } from "../validators/expenseValidator";
import { validateRequest } from "../middleware/validateRequest";


const expenseRoute = Router();

expenseRoute.post('/', AuthMiddleWare, validateRequest(createExpenseValidator), createExpenseController);


export default expenseRoute;