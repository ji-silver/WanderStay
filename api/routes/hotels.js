import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
} from "../controllers/hotel.js";
const router = express.Router();
import { verifyAdmin } from "../utils/verifyToken.js";

// controllers로 분리 -> 인증된 사용자만 CRUD 가능하게 하기위해

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE (/req.params.id)
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET
router.get("/:id", getHotel);

// GET ALL
router.get("/", getHotels);

export default router;
