import User from "../models/User.js";

/**
 * CRUD 비동기로 만들기 (db에서 받아오는데 시간이 걸림)
 * 라우터 핸들러!
 * next => 현재 미들웨어 실행 후 다음 미들웨어로 넘어감
 */

/**
 * mongoDB 내장함수인 findByIdAndUpdate()로 호텔 ID를 db에서 찾음
 * 첫번째 인자로 id, 두번째 인자로 $set 연산자를 이용해서 전달된 데이터 업데이트
 */
export const updateUser = async (req, res, next) => {
  try {
    // findByIdAndUpdate()는 mongoDB에서 id와 일치하는 것 찾기
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, // URL 매개변수로 추출된 id
      { $set: req.body }, // $set은 새로운값 할당, 변경 시 사용. 업데이트할 필드 지정
      { new: true } // findByIdAndUpdate() 옵션 객체. 지정 안 하면 업데이트 이전 문서 반환.
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findOneAndDelete(req.params.id);
    res.status(200).json("삭제되었습니다.");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
