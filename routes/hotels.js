import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

/**
 * CRUD 비동기로 만들기 (db에서 받아오는데 시간이 걸림)
 * 라우터 핸들러!
 */
// CREATE
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel); // 200성공한다면 savedHotel 반환
  } catch (err) {
    res.status(500).json(err); // 500은 서버 에러
  }
});

// UPDATE (/req.params.id)
router.put("/:id", async (req, res) => {
  try {
    //mongoDB 내장함수인 findByIdAndUpdate()로 호텔 ID를 db에서 찾음
    // 첫번째 인자로 id, 두번째 인자로 $set 연산자를 이용해서 전달된 데이터 업데이트
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id, // id와 일치하는 호텔
      {
        $set: req.body, // 업데이트
      },
      { new: true } // 업데이트된 호텔 정보 반환
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findOneAndDelete(
      req.params.id // id와 일치하는 호텔
    );
    res.status(200).json("삭제되었습니다.");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(
      req.params.id // id와 일치하는 호텔
    );
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    const hotels = await Hotel.find(req.params.id);
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
