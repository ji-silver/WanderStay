import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// 방 추가
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid; // URL 경로에서 추출된 라우트 매개변수(호텔 id) 추출
  const newRoom = req.body; // 요청 본문에 담은 방 정보 저장

  try {
    // Room 모델에서 newRoom 새로운 방 데이터 생성
    const savedRoom = await Room.create(newRoom);
    try {
      // 성공적으로 생성 시 Hotel 모델에서 hotelId와 일치하는 호텔 문서를 찾아 업데이트
      // $push는 배열에 요소 추가 시 사용, rooms 배열에 savedRoom의 _id 값 넣기 (Hotel과 Room 연결)
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// 방 수정
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id, // URL 매개변수로 추출된 id
      { $set: req.body }, // $set은 새로운값 할당, 변경 시 사용. 업데이트할 필드 지정
      { new: true } // findByIdAndUpdate() 옵션 객체. 지정 안 하면 업데이트 이전 문서 반환.
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  // api/rooms/:id(room_id)/hotelid(hotel_id)
  const hotelId = req.params.hotelid;
  try {
    // $pull은 배열에서 요소를 제거하는 역할로, hotelId를 찾고 거기에 rooms 배열에서 URL에 있는 id를 제거한다.
    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
  } catch (err) {
    next(err);
  }
  try {
    // Room 모델에서도 해당하는 방 id 삭제하기
    await Room.findOneAndDelete(req.params.id);
    res.status(200).json("방이 삭제되었습니다.");
  } catch (err) {
    next(err);
  }
};

// 특정 방 불러오기
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// 모든 방 불러오기
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
