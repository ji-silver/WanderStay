import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

/**
 * CRUD 비동기로 만들기 (db에서 받아오는데 시간이 걸림)
 * 라우터 핸들러!
 * next => 현재 미들웨어 실행 후 다음 미들웨어로 넘어감
 */

// 호텔 추가
export const createHotel = async (req, res, next) => {
  try {
    const savedHotel = await Hotel.create(req.body);
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

/**
 * mongoDB 내장함수인 findByIdAndUpdate()로 호텔 ID를 db에서 찾음
 * 첫번째 인자로 id, 두번째 인자로 $set 연산자를 이용해서 전달된 데이터 업데이트
 */
// 호텔 수정
export const updateHotel = async (req, res, next) => {
  try {
    // findByIdAndUpdate()는 mongoDB에서 id와 일치하는 것 찾기
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id, // URL 매개변수로 추출된 id
      { $set: req.body }, // $set은 새로운값 할당, 변경 시 사용. 업데이트할 필드 지정
      { new: true } // findByIdAndUpdate() 옵션 객체. 지정 안 하면 업데이트 이전 문서 반환.
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// 호텔 삭제
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findOneAndDelete(req.params.id); // id와 일치하는 호텔 삭제
    res.status(200).json("삭제되었습니다.");
  } catch (err) {
    next(err);
  }
};

// 특정 호텔 불러오기
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id); // id와 일치하는 호텔 찾기
    res.status(200).json(hotel); // 해당 hotel 정보 클라이언트에 반환
  } catch (err) {
    next(err);
  }
};

// 모든 호텔 불러오기 (옵션에 따라)
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: {
        /**
         * 최소, 최대값 지정. min보다 크거나 같고, max보다 작거나 같은 호텔 가격 검색
         * gte: 크거나 같고, lte: 작거나 같다.
         * 쿼리 파라미터가 문자열로 처리되기 때문에 parseInt() 정수로 변환
         * || 연산자를 사용하면 해당값보다 작거나 커도 기본으로 아래값으로 제한됨
         */
        $gte: parseInt(min) || 1,
        $lte: parseInt(max) || 1000000,
      },
    });
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// 지역 호텔 개수 불러오기
export const countByCity = async (req, res, next) => {
  // URL에서 ? 뒤에 오는 파라미터를 쉼표로 분리해서 배열로 만들기
  const cities = req.query.cities.split(",");
  try {
    // cities배열을 map()으로 돌린 새로운 배열을 Promise.all()에서 병렬(동시) 실행
    // countDocuments()는 Hotel 모델에서 지정한 도시와 일치하는 문서 개수 조회
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// 호텔 타입 개수 불러오기
export const countByType = async (req, res, next) => {
  try {
    // Hotel 모델의 type 기준으로 개수 조회하기
    const hotelCount = await Hotel.countDocuments({ type: "호텔" });
    const motelCount = await Hotel.countDocuments({ type: "모텔" });
    const resortCount = await Hotel.countDocuments({ type: "리조트" });
    const cottageCount = await Hotel.countDocuments({ type: "펜션" });
    const glampingCount = await Hotel.countDocuments({ type: "글램핑" });
    res.status(200).json([
      { type: "호텔", count: hotelCount },
      { type: "모텔", count: motelCount },
      { type: "리조트", count: resortCount },
      { type: "펜션", count: cottageCount },
      { type: "글램핑", count: glampingCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// 특정 호텔의 객실 배열로 불러오기
export const getHotelRooms = async (req, res, next) => {
  try {
    // params에서 호텔 id를 받고 DB에서 해당 호텔 찾기
    const hotel = await Hotel.findById(req.params.id);
    // 해당 호텔 객실의 id를 찾고 객실 정보 목록을 list에 저장
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
