const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new localStrategy(
    {
        usernameField: 'id',
        passwordField: 'password',
        session: true,
        passReqToCallback: false,
    }, 
    async(id, password, done) => {
        try{
            const user = await(User.findOne({
                where:{id}
            }));
            if (!user) { return done(null, false, {message :"존재하지 않는 사용자입니다."}); }
            console.log("입력한 비밀번호",password);
            console.log("유저정보",user);
            const result = await bcrypt.compare(password, user.password);
            if (!result) { return done(null, false, {message: "비밀번호가 일치하지 않습니다."})};
            return done(null, user);
        }catch(error){
            console.error(error);
            done(error);
        }            
    }));
};

