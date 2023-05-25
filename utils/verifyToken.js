import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// 토큰 검증
export const verifyToken = (req, res, next) => {
  // 요청으로 들어온 cookies 속성의 token 쿠키값 가져오기
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "토큰이 없습니다."));
  }

  // jwt.verify(검증할 토큰, 시크릿키, 검증 결과 처리하는 콜백함수(err, decoded)) => 토큰 유효성 검사 해독하고 검증
  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) return next(createError(403, "유효하지 않은 토큰입니다."));
    // 토큰이 유효하면 해독된 사용자정보를 req.user에 저장 (다음 미들웨어, 핸들러에서 사용자 정보에 접근하기 위해)
    req.user = decoded;
    // 다음 미들웨어 이동
    next();
  });
};

// 사용자 인증
export const verifyUser = (req, res, next) => {
  // 위에 있는 토큰 검증 먼저 실행
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      if (err) return next(createError(403, "접근 권한이 없습니다."));
    }
  });
};

// 관리자 인증
export const verifyAdmin = (req, res, next) => {
  // 위에 있는 토큰 검증 먼저 실행
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      if (err) return next(createError(403, "접근 권한이 없습니다."));
    }
  });
};
