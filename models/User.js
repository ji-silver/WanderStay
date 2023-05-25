import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // 이름 필수, unique 유일한 값
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    //관리자
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // 생성 일시, 업데이트 일시 저장
);

export default mongoose.model("User", UserSchema);
