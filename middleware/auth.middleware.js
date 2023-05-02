const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token.split(" ")[1], "socialmedia");
    if (decoded) {
      req.body.authorID=decoded.authorID;
      req.body.author=decoded.author;
      next();
    } else {
      res.status(200).send({ msg: "Please Login !!" });
    }
  } else {
    res.status(200).send({ msg: "Please Login !!" });
  }
};

module.exports = {
  authenticate,
};
