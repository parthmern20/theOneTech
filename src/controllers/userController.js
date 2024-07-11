import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { name, address, age, mobile, email } = req.body;

    if (!name || !address || !age || !mobile || !email) {
      return res.status(422).json({
        error: true,
        message: "Please fill all the required fields!",
      });
    }

    const emailExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExist) {
      return res.status(409).json({
        error: true,
        message: "This email already exists",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        address,
        age,
        mobile,
        email,
      },
    });

    return res.status(201).json({
      error: false,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: err.message ? err.message : "Server Error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req?.query?.sort || "name";
    const searchQuery = req?.query?.search;
    const sortOrd = req?.query?.sortOrd === "asc" ? "asc" : "desc";

    const users = await prisma.user.findMany({
      where: searchQuery
        ? {
            OR: [
              { email: { contains: searchQuery} },
              { address: { contains: searchQuery } },
            ],
          }
        : {},
      orderBy: {
        [sort]: sortOrd,
      },
      skip: skip,
      take: limit,
    });

    const totalCount = await prisma.user.count({
      where: searchQuery
        ? {
            OR: [
              { email: { contains: searchQuery } },
              { address: { contains: searchQuery } },
            ],
          }
        : {},
    });

    res.status(200).json({
      error: false,
      message: "All Users data fetched successfully",
      data: users,
      pagination: {
        totalCount,
        page,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: err.message ? err.message : "Server Error",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    return res.status(200).json({
      error: false,
      message: "User data fetched successfully",
      data: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: err.message ? err.message : "Server Error",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, age, mobile, email } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const emailExists = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: parseInt(id),
        },
      },
    });

    if (emailExists) {
      return res
        .status(400)
        .json({ error: true, message: "This email already exists" });
    }

    const updatedUser = await prisma.user.update({
      where: { id : parseInt(id) },
      data: {
        name: name ?? user.name,
        address: address ?? user.address,
        age: age ?? user.age,
        mobile: mobile ?? user.mobile,
        email: email ?? user.email,
        updatedAt: new Date(),
      },
    });

    return res.status(200).json({
      error: false,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: err.message ? err.message : "Server Error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    const deleteUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({
      error: false,
      message: "User deleted successfully",
      data: deleteUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: err.message ? err.message : "Server Error",
    });
  }
};
