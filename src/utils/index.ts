import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "my_jwt_secret";

export const generateToken = (details: any) => {
   return jwt.sign({ ...details }, JWT_SECRET);
};