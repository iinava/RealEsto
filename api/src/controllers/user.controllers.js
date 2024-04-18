import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getusers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ messge: "failed to get users" });
  }
};
export const getuser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ messge: "failed to get user " });
  }
};
// export const updateuser = async (req, res, next) => {
//   const id = req.params.id;
//   const tokenUserId = req.userid;
//   const { password, avatar, ...inputs } = req.body;

//   if (id !== tokenUserId) {
//     return res.status(403).json({ message: "Not Authorized!" });
//   }

//   let updatedPassword = null;
//   try {
//     if (password) {
//       updatedPassword = await bcrypt.hash(password, 10);
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id },
//       data: {
//         username,
//         email,
//         ...(updatedPassword && { password: updatedPassword }),
//         ...(avatar && { avatar }),
//       },
//     });

//     const { password: userPassword, ...rest } = updatedUser;

//     res.status(200).json(rest);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to update users!" });
//   }
// };

export const updateuser = async (req, res) => {
  const userId = req.params.id;
  const { email, username, password, avatar } = req.body;

  try {
    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ messge: "User not found" });
    }

    // Prepare data for update
    const data = {};
    if (email) data.email = email;
    if (username) data.username = username;
    if (avatar) data.avatar = avatar;

    if (password) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      data.password = hashedPassword;
    }

    // Update user information
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteuser = async (req, res, next) => {
  const id = req.params.id;
  const tokenuserid = req.userid;
  // console.log("deleting user");

  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenuserid) {
    return res.status(403).json({ messge: "Not authorized" });
  }
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ messge: "deleted" });
  } catch (error) {
    res.status(500).json({ messge: "failed to get user" });
  }
};

export const profilepost = async (req, res) => {
  const tokenuserid = req.params.userid;
  console.log("wprld");
  try {
    const userpost = await prisma.post.findMany({
      where: {
        userId: tokenuserid,
      },
    });
    const savedposts = await prisma.savedPost.findMany({
      where: {
        userId: tokenuserid,
      },
      include: {
        post: true,
      },
    });

    const saved = savedposts.map((item) => item.post);

    console.log(userpost, saved);
    res.status(200).json({ userpost, saved });
  } catch (error) {
    console.log(error);
    res.json(500).json({ message: "Failed to get profile" });
  }
};

export const notificationsNumber = async (req, res) => {
  const tokenUserId = req.userid;
  console.log(tokenUserId,"vannnd");
  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
    });
    res.status(200).json({number});
    console.log(number);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};
