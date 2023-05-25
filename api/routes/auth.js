import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

// get method는 주소창에 입력해서 요청하기
router.post("/register", register);
router.post("/login", login);

export default router;
