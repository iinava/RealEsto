import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //hashing the passsord
    const hashedpassword = await bcrypt.hash(password, 10);
    //create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedpassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "user created " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to create user" });
  }
  //save new user to database
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  //check if user exists
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    //check if password is correct

    const ispasswordValid = await bcrypt.compare(password, user.password);
    if (!ispasswordValid)
      return res.status(401).json({ message: "invalid credentialas" });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.jwt_secret
    );
    const age = 1000 * 60 * 60 * 24 * 7;
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true
        maxAge: age,
      })
      .status(200)
      .json({ message: "login successful" ,user: { id: user.id, username: user.username ,email:user.email,avatar:user.avatar } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to login "  });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "logout successful" });
};
