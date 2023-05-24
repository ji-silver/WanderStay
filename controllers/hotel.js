import Hotel from "../models/Hotel.js";

/**
 * CRUD 비동기로 만들기 (db에서 받아오는데 시간이 걸림)
 * 라우터 핸들러!
 * next => 현재 미들웨어 실행 후 다음 미들웨어로 넘어감
 */
// export const createHotel = async (req, res, next) => {
//   // Hotel model에 정의한 스키마에 따라 새로운 호텔 객체를 생성하고 클라이언트로 부터 받아온 body 데이터를 newHotel에 할당
//   const newHotel = new Hotel(req.body);
//   try {
//     //save()는 mongoose 메서드로 mongoDb에 저장하는 역할, save()가 완료될 때까지 대기하고 결과를 savedHotel 할당
//     const savedHotel = await newHotel.save();
//     res.status(200).json(savedHotel); // 200성공한다면 savedHotel 반환 (json형식으로)
//   } catch (err) {
//     next(err);
//   }
// };

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
