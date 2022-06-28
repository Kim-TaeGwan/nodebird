const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  // 라우터용 미들웨어를 만들어 탬플릿 엔진에서 사용할 user, followerCount,followingCount, followerIdList 변수를 res.locals 로 설정.
  // res.locals 로 값을 설정하는 이유는 user, followerCount,followingCount, followerIdList 변수를 모든 템플릿 엔진에서 공통으로 사용하기 떄문이다.
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get("/profile", (req, res) => {
  res.render("profile", { title: "내 정보 - NodeBird" });
});

router.get("/join", (req, res) => {
  res.render("join", { title: "회원가입 - NodeBird" });
});

router.get("/", (req, res, next) => {
  const twits = [];
  res.render("main", {
    title: "NodeBird",
    twits,
  });
});

module.exports = router;
