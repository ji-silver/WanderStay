import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// CREATE 비동기로 만들기 (db에서 받아오는데 시간이 걸림)
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel); // 200성공한다면 savedHotel 반환
  } catch (err) {
    res.status(500).json(err); // 500은 서버 에러
  }
});
// UPDATE
// DELETE
// GET
// GET ALL

export default router;
