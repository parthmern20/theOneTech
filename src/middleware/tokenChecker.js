import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET=process.env.JWT_SECRET;

export const tokenChecker = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
        error: true,
        message: "Token Required",
      });
  }

  const auth = token.substring(7, token.length);
  
  jwt.verify(auth, JWT_SECRET, async (err, decoded) => {
    if (err) {
        return res.status(403).json({
            error: true,
            message: "Token Error",
          });
    }
    const admin = await prisma.admin.findUnique({ where: { id: decoded?.id } });
    if (!admin) {
        return res.status(403).json({
            error: true,
            message: "Admin Not Found",
          });
    }
    req.admin = admin;
    next();
  });
};

