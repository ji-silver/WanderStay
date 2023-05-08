import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
dotenv.config(); // .env파일에 환경변수 설정

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO); // connect 함수 안에 몽고 디비 연결하기
    console.log("Connected to MongoDB");
  } catch (error) {
    // 연결이 안되면 에러 던지기
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDb disconnected!");
});

/**
 * api endpoint: 요청이 auth라는 api에 접근하기 위한 URL.
 * URL로 서버에 요청을 보내고 서버는 해당 api 기능을 처리한다.
 */
// middlewares
app.use("/api/auth", authRoute);
app.use("/api/users", authRoute);
app.use("/api/hotels", authRoute);
app.use("/api/rooms", authRoute);

// 8080포트 연결
app.listen(8800, () => {
  connect();
  console.log("Connected to backend");
});
