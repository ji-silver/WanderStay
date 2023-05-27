import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config(); // .env파일에 환경변수 설정

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO); // connect 함수 안에 몽고 디비 연결하기
    console.log("정상적으로 MongoDB 서버에 연결되었습니다.");
  } catch (error) {
    // 연결이 안되면 에러 던지기
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDb disconnected!");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

/**
 * api endpoint: 요청이 auth라는 api에 접근하기 위한 URL.
 * URL로 서버에 요청을 보내고 서버는 해당 api 기능을 처리한다.
 * /api/auth 경로로 들어왔을 때 authRoute 미들웨어 함수 처리
 */
// middlewares 라우팅 설정하기
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// 에러처리 미들웨어 (err, req, res, next가 반드시 필요!)
app.use((err, req, res, next) => {
  // 서버 전역에서 에러 발생 시 err객체의 status, message를 추출하고 응답코드 500과 message를 나타내기
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "서버 오류";
  // 클라이언트에 전달 (stack은 디버깅 하기 위한 스택 추적 정보)
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// 8800포트 연결
app.listen(8800, () => {
  connect();
  console.log("8800 포트 연결 완료");
});
