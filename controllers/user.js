import User from "../models/User.js";
import bcrypt from "bcryptjs";

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
    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, password: hash } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

//req.params.id를 그대로 전달하면 못찾아서 _id 사용
export const deleteUser = async (req, res, next) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
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
