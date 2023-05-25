import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";

const router = express.Router(); // 라우터 내보내기

// UPDATE (/req.params.id)
router.put("/:id", updateUser);

// DELETE
router.delete("/:id", deleteUser);

// GET
router.get("/:id", getUser);

// GET ALL
router.get("/", getUsers);

export default router;
