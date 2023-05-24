import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
} from "../controllers/hotel.js";
const router = express.Router();

// controllers로 분리 -> 인증된 사용자만 CRUD 가능하게 하기위해
// CREATE
router.post("/", createHotel);

// UPDATE (/req.params.id)
router.put("/:id", updateHotel);

// DELETE
router.delete("/:id", deleteHotel);

// GET
router.get("/:id", getHotel);

// GET ALL
router.get("/", getHotels);

export default router;
