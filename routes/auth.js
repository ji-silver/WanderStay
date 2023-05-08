import express from "express";

const router = express.Router(); // 라우터 내보내기

// get method는 주소창에 입력해서 요청하기
router.get("/", (req, res) => {
  // 요청과 응답
  res.send("hello auth endpoint");
});

router.get("/register", (req, res) => {
  res.send("hello register endpoint");
});

export default router;
