const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware.verifyToken, postController.addPost);
router.get("/", authMiddleware.verifyToken, postController.getAllPosts);
router.put("/:id", authMiddleware.verifyToken, postController.updatedPost);
router.delete("/:id", authMiddleware.verifyToken, postController.deletedPost);

module.exports = router;
