import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await prisma.admin.findFirst({
      where: {
        email: email,
      },
    });

    if (exists !== null) {
      return res.status(409).json({
        error: true,
        message: "Email already exists. Please try with a different email.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      error: false,
      message: "Admin registered Successfully",
      data: admin,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      error: true,
      message: err.message ? err.message : "Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let admin = await prisma.admin.findFirst({
      where: {
        email: email,
      },
    });

    if (!admin) {
      return res.status(404).json({
        error: true,
        message: "Admin not found",
      });
    }

    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return res.status(401).json({
        error: true,
        message: "Invalid password",
      });
    }

     admin = await prisma.admin.findFirst({
        where: {
          email: email,
        },
        select: {
            id: true,
            email: true,
        }
      });

    const refreshToken = jwt.sign({ id: admin?.id, email: admin?.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });
    const accessToken = jwt.sign({ id: admin?.id, email: admin?.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    });

    const data = { admin, refreshToken, accessToken };
    return res.status(200).json({
      error: false,
      message: "Admin login successfully",
      data: data,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      error: true,
      message: err.message ? err.message : "Server Error",
    });
  }
};
