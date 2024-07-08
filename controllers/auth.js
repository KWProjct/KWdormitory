const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');

exports.join = async (req, res, next) => {
    const {id, pw, gender, city, roomno, phone} = req.body;
    console.log(id, pw, gender, city, roomno, phone);
    try{
        const exUser = await User.findOne({where: {id}});
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(pw, 12);
        await User.create({
            ID: id,
            PW: hash,
            ADD1: city,
            PHONE: phone,
            ROOMNO: roomno,
            GENDER: gender
        });
        return res.redirect('/login');
    }catch(error){
        console.error(error);
        return next(error);
    }
}


exports.login = (req, res, next) => {
    passport.authenticate('local',(err, user, info) => {
        //콜백 함수의 인자는 done으로 전달된 인자들을 의미한다.
        if(err){
            console.error(err);
            next(err);
        }
        if(info){
            console.log(info);
            return res.status(401).send(info.message);
        }
        return req.login(user, (loginErr) => {
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            return res.status(201).send("로그인 성공");
        });
    })(req, res, next);
};