const express = require("express");
const router = express.Router();
const { createComment, updateComment, getAllComments, getComment, deleteComment } = require("../controllers/commentCtrl.js");
const { authMiddleware, authRoles } = require("../middlewares/auth.js");

router.put("/comment", authMiddleware, createComment);
router.put("/edit-comment/:id", authMiddleware, updateComment);

router.get("/comments", getAllComments);
router.get("/comment/detail", getComment);

router.delete("/comment/delete", deleteComment);

module.exports = router;