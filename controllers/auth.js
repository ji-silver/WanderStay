import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// 가입하기
export const register = async (req, res, next) => {
  try {
    // bcrypt로 비밀번호 암호화 하기
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({
      ...req.body,
      password: hash,
    });

    res.status(200).send("회원가입이 완료되었습니다.");
  } catch (err) {
    next(err);
  }
};

// 로그인
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "회원정보가 없습니다."));

    // bcrypt.compare() 함수로 요청된 비밀번호와 hash된 비밀번호 비교
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(
        createError(400, "이메일 혹은 비밀번호가 일치하지 않습니다.")
      );

    // jwt.sign()함수에 인자값으로 paylaod(데이터)와 발급받은 시크릿키 넣기(env)
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    // user에서 password, isAdmin을 제외하고 나머지 속성을 otherDetails객체에 포함시키기
    // cookie("쿠키 이름", 토큰, {httpOnly: true => 쿠키가 자바스크립트 접근 x})
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      // details 키에 ohterDetails와 isAdmin 값 할당 => 사용자 정보, 관리자 여부 확인
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
