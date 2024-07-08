const passport = require("passport");
const { User } = require("../models");
const local = require("./local");
//const kakao = require("./kakaoStrategy");
//const facebook = require("./facebookStrategy");
//const google = require("./googleStrategy");

/*
done의 인자 구성
(서버 에러 발생의 경우, 성공시 return 값, 전달 메세지->임의로 에러를 만들고 싶은 경우 사용)

로그인 성공시 serializeUser가 실행됨.
그 이후 서버로 들어오는 요청이 있을 때 세션 정보를 실 DB의 데이터와 비교함. 
*/

module.exports = () => {
  passport.serializeUser((user, done) => {// Strategy 성공 시 호출
    // 여기의 user.id가 req.session.passport.user에 저장
    done(null, user.id); // 여기의 user.id가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser(async (id, done) => {
    try {
      // 매개변수 id는 serializeUser의 done의 인자 user.id를 받은 것
      // done을 통해 매개변수 전달이 이뤄지기 때문에 둘의 타입이 항상 일치되어야 함.
      // id 값으로 사용자인증 (서버로 들어오는 매 요청마다 실행)
      const user = await User.findOne({ where: { id } });
      done(null, user); // 여기의 user가 req.user가 됨
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  /*
  id만 존재하는 경우 req.user를 만들 수 없기 때문에 findById를 사용해 user 객체를 완성시켜 done을 사용
  
  passport.deserializeUser((id, done) => { // 매개변수 id는 req.session.passport.user에 저장된 값
  User.findById(id, (err, user) => {
        done(null, user); // 여기의 user가 req.user가 됨
        });
    });
 */

  local();
};