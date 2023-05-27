import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  // 호텔 이름 필수
  name: {
    type: String,
    required: true,
  },
  // 호텔 종류
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  // 호텔 등급 (0~5등급)
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  // 방 ID를 포함하기 때문에 배열
  rooms: {
    type: [String],
  },
  // 최저가
  cheapestPrice: {
    type: Number,
    required: true,
  },
  // 반응형 앱에선 추천 호텔 보여줌
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Hotel", HotelSchema);
