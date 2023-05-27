import Hotel from "../models/Hotel.js";

/**
 * CRUD 비동기로 만들기 (db에서 받아오는데 시간이 걸림)
 * 라우터 핸들러!
 * next => 현재 미들웨어 실행 후 다음 미들웨어로 넘어감
 */

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

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findOneAndDelete(req.params.id); // id와 일치하는 호텔 삭제
    res.status(200).json("삭제되었습니다.");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id); // id와 일치하는 호텔 찾기
    res.status(200).json(hotel); // 해당 hotel 정보 클라이언트에 반환
  } catch (err) {
    next(err);
  }
};

/**
 * get요청 시 failed가 true이면, next() 호출 (createError() 함수에 401 에러객체 전달)
 */
export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find(); // 모든 호텔 조회
    res.status(200).json(hotels); // 조회된 모든 호텔 클라이언트에 반환
  } catch (err) {
    next(err);
  }
};

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
