import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    // bcrypt로 비밀번호 암호화 하기
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    res.status(200).send("회원가입이 완료되었습니다.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    // username 확인
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "회원정보가 없습니다."));

    // bcrypt.compare() 함수로 요청된 비밀번호와 hash된 비밀번호 비교
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "이름 혹은 비밀번호가 일치하지 않습니다."));

    // user에서 password, isAdmin을 추출하고 나머지 속성을 otherDetails객체에 포함시키기
    const { password, isAdmin, ...otherDetails } = user._doc;
    res.status(200).json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
