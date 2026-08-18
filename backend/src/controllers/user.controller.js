import { prisma } from "../utils/db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      })
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (user) {
      return res.status(400).json({
        message: "User already exist with this email",
        sucess: false
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        phoneNumber:Number(phoneNumber),
        password: hashedPassword,
        role
      }
    })
    return res.status(201).json({
      message: "User created successfully",
      newUser,
      success: true
    })
  } catch (error) {
    console.error(error);
  }
}

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      })
    }
    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false
      })
    }
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role"
      })
    }
    const tokenData = {
      userId: user.id
    }
    const token = jwt.sign(
      tokenData,
      process.env.SECRET_KEY,
      {
        expiresIn: "1d"
      }
    )
    const User = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }
    return res.status(200).cookie("token", token,
      {
        maxAge: 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict"
      }
    ).json({
      message: `Welcome back ${user.fullname}`,
      User,
      success: true
    })
  } catch (error) {
    console.error(error);
  }
}

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully",
      success: "true"
    })
  } catch (error) {
    console.error(error);
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    //cloudinary
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; //middleware
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      },
      include: {
        profile: true
      }
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: true
      })
    }
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        fullname,
        email,
        phoneNumber,
        profile: {
          update: {
            bio,
            skills: skillsArray,
          }
        }
      },
      include: {
        profile: true
      },
    })
    const User = {
      id: updateUser.id,
      fullname: updateUser.fullname,
      email: updateUser.email,
      phoneNumber: updateUser.phoneNumber,
      role: updateUser.role,
      profile: updateUser.profile
    }
    return res.status(200).json({
      message: "Profile updated successfully",
      User,
      success: true
    })
    await prisma.user.update()
  } catch (error) {

  }
}