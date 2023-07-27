import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router(); // 라우터 내보내기

// // checkauthentication경로로 GET 요청 시 verifyToken 미들웨어 실행
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("로그인 되었습니다.");
// });

// // checkuser/id 경로로 GET 요청 시 verifyUser 미들웨어 실행 (사용자 로그인)
// router.get("/checkuser/:id", verifyUser);

// // checkuser/id 경로로 GET 요청 시 verifyAdmin 미들웨어 실행 (관리자 로그인)
// router.get("/checkadmin/:id", verifyAdmin);

// 유저 UPDATE
router.put("/:id", verifyUser, updateUser);

// 유저 DELETE
router.delete("/:id", verifyUser, deleteUser);

// 유저 정보 GET
router.get("/:id", verifyAdmin, getUser);

// 유저 정보 GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
