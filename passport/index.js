const passport = require("passport");
const { User } = require("../models");
const local = require("./local");
const kakao = require("./kakaoStrategy");
const facebook = require("./facebookStrategy");
const google = require("./googleStrategy");


module.exports = () => {
  passport.serializeUser((user, done) => {
    // Strategy 성공 시 호출됨
    // 여기의 user.id가 req.session.passport.user에 저장
    done(null, user.id); // 여기의 user.id가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser(async (id, done) => {
    try {
      // 매개변수 id는 serializeUser의 done의 인자 user.id를 받은 것
      // 매개변수 id는 req.session.passport.user에 저장된 값
      // id 값으로 사용자인증 (서버로 들어오는 매 요청마다 실행)
      const user = await User.findOne({ where: { id } });
      done(null, user); // 여기의 user가 req.user가 됨
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};