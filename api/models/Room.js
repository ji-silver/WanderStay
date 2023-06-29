import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      default: false,
    },
    // 방번호와 예약할 수 없는 날짜를 포함한 배열, 속성 안에 객체가 있을 때 _id값 또 따로 자동 생성
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true } // 생성 일시, 업데이트 일시 저장
);

export default mongoose.model("Room", RoomSchema);
