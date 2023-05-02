const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    title: { type: "string", required: true },
    body: { type: "string", required: true },
    device: { type: "string", required: true },
    authorID: { type: "string", required: true },
    author: { type: "string", required: true },
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = {
  PostModel,
};
