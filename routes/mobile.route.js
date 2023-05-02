const express = require("express");
const { PostModel } = require("../model/mobile.model");
postRoutes = express.Router();

postRoutes.get("/", async (req, res) => {
  try {
    const post = await PostModel.find({ authorID: req.body.authorID });
    res.send(post);
  } catch (error) {
    res.status(500).send({ err: error.massage });
  }
});

postRoutes.post("/create", async (req, res) => {
  try {
    const posts = new PostModel(req.body);
    await posts.save();
    res.status(200).send({ msg: "Post Get Added Successfully" });
  } catch (error) {
    res.status(500).send({ err: error.massage });
  }
});

postRoutes.patch("/update/:postID", async (req, res) => {
  const { postID } = req.params;
  const post = await PostModel.findOne({ _id: postID });
  try {
    if (req.body.authorID !== post.authorID) {
      res
        .status(200)
        .send({ msg: "You Are Not The Authorize Person To Do This Action" });
    } else {
      await PostModel.findByIdAndUpdate({ _id: postID }, req.body);
      res.status(200).send({ msg: "Post Has Been Updated Successfully" });
    }
  } catch (error) {
    res.status(500).send({ err: error.massage });
  }
});

postRoutes.delete("/delete/:postID", async (req, res) => {
  const { postID } = req.params;
  const post = await PostModel.findOne({ _id: postID });
  try {
    if (req.body.authorID !== post.authorID) {
      res
        .status(200)
        .send({ msg: "You Are Not The Authorize Person To Do This Action" });
    } else {
      await PostModel.findByIdAndDelete({ _id: postID });
      res.status(200).send({ msg: "Post Has Been Deleted Successfully" });
    }
  } catch (error) {
    res.status(500).send({ err: error.massage });
  }
});

module.exports = {
  postRoutes,
};
