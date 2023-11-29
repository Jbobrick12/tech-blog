const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

// GET all posts for dashboard
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("all-posts-admin", {
      layout: "dashboard",
      posts,
    });
  } catch (err) {
    console.log(err);
    res.redirect("login");
  }
});

// GET one post for dashboard
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render("edit-post", {
      layout: "dashboard",
      post,
    });
  } catch (err) {
    console.log(err);
    res.redirect("login");
  }
});

// GET new post for dashboard
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
  });
});

// insert new post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    const post = newPost.get({ plain: true });
    if (newPost) {
      res.status(200).json(post);
    } else {
      res.status(400).json({ message: "Error creating post" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update a post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(400).json({ message: "Error updating post" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedPost) {
      res.status(200).json(deletedPost);
    } else {
      res.status(400).json({ message: "Error deleting post" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;