import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getposts = async (req, res) => {
  const query = req.query;
  console.log(query);

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });
    // console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get posts" });
  }
};
export const getpost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        PostDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, process.env.jwt_secret, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userid: payload.id,
              postid: id,
            },
          });
          // console.log(saved);
          res.status(200).json({ ...post, isSaved: saved ? true : false });
        }
      });
    } else {
      res.status(200).json({ ...post, isSaved: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get single post" });
  }
};

export const addpost = async (req, res) => {
  const body = req.body;

  const tokenUserId = req.userid;
  try {
    const newpost = await prisma.post.create({
      data: {
        ...body.PostData,
        userid: tokenUserId,
        PostDetail: {
          create: body.PostDetail,
        },
      },
    });
    res.status(200).json(newpost);
  } catch (error) {
    console.log(error);
    res.json(500).json({ message: "Failed to add posts" });
  }
};
export const updatepost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.json(500).json({ message: "Failed to update posts" });
  }
};
export const deletepost = async (req, res) => {
  const postId = req.params.id;
  const tokenUserId = req.userid;

  try {
    // Find the post
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { PostDetail: true }, // Include PostDetail if it exists
    });

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the requesting user is authorized to delete the post
    if (post.userid !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    // Delete the related PostDetail if it exists
    if (post.PostDetail) {
      await prisma.postDetail.delete({
        where: { id: post.PostDetail.id },
      });
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: postId },
    });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

export const saveposts = async (req, res) => {
  const postid = req.body.postId;
  const tokenUserId = req.userid;
  // console.log(postid, tokenUserId);
  try {
    //check if post is already saved
    const savedpost = await prisma.savedPost.findUnique({
      where: {
        userid_postid: {
          userid: tokenUserId,
          postid,
        },
      },
    });
    if (savedpost) {
      await prisma.savedPost.delete({
        where: {
          id: savedpost.id,
        },
      });
      res.status(200).json({ message: "Post removed from saved list" });
    } else {
      await prisma.savedPost.create({
        data: {
          userid: tokenUserId,
          postid,
        },
      });

      res.status(200).json({ message: "Post added to saved list" });
    }
  } catch (error) {
    console.error("Error saving post:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the post" });
  }
};
