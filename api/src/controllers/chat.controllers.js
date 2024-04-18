import prisma from "../lib/prisma.js";

export const getchats = async (req, res) => {
  const tokenUserId = req.userid;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    for (const chat of chats) {
      const recieverid = chat.userIDs.find((id) => id !== tokenUserId);
      const reciever = await prisma.user.findUnique({
        where: {
          id: recieverid,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });

      chat.reciever = reciever;
    }

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get chats" });
  }
};

export const getchat = async (req, res) => {
  const tokenuserid = req.userid;
  const id = req.params.id;
  console.log(tokenuserid, id);

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id,
        userIDs: {
          hasSome: [tokenuserid],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id,
      },
      data: {
        seenBy: {
          set: [tokenuserid],
        },
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get chats " });
  }
};
export const addchat = async (req, res) => {
  const tokenUserId = req.userid;
  const recieverId = req.body.recieverId;

  try {
    // Fetch all chats involving the current user
    const userChats = await prisma.chat.findMany({
      where: {
        userIDs: {
          has: tokenUserId
        }
      }
    });

    // Find the chat involving both users
    const existingChat = userChats.find(chat => chat.userIDs.includes(recieverId));

    if (existingChat) {
      // If a chat already exists, return it
      res.status(200).json(existingChat);
      return;
    }

    // If a chat doesn't exist, create a new one
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, recieverId],
      },
    });

    res.status(200).json(newChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create or retrieve chat" });
  }
};


export const readchat = async (req, res) => {
  const tokenUserId = req.userid;
  const id = req.params.id;
  try {
    const chat = await prisma.chat.update({
      where: {
        id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get chats " });
  }
};
