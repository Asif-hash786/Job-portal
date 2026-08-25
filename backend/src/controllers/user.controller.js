import { prisma } from "../utils/db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import getdataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      })
    }
    const file = req.file;
    const fileUri = getdataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "image",
    });
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
        phoneNumber: phoneNumber,
        password: hashedPassword,
        role,
        profile: {
          create: {
            profilePhoto: cloudResponse?.secure_url
          }
        }
      },
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
      },
      include: {
        profile: true
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

    let cloudResponse;
    if (file) {
      const fileUri = getdataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "auto",
      });
    }
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
          upsert: {
            create: {
              bio,
              skills: skillsArray,
              resume: cloudResponse?.secure_url,
              resumeOriginalName: file?.originalname,
            },

            update: {
              bio,
              skills: skillsArray,
              resume: cloudResponse?.secure_url,
              resumeOriginalName: file?.originalname
            },
          },
        },
      },

      include: {
        profile: true,
      },
    });

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

  } catch (error) {
    console.log(error);
  }
}