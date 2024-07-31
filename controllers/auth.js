const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');

exports.join = async (req, res, next) => {
    const {id, pw, nick, gender, city, roomno, phone} = req.body;
    console.log(id, pw, nick, gender, city, roomno, phone);
    try{
        const exUser = await User.findOne({where: {id}});
        const exRoom = await User.findOne({where: {roomno}});
        if(exUser){
            return res.send(`<script type="text/javascript">alert("이미 존재하는 아이디입니다."); window.location = document.referrer;</script>`);
        }
        if(exRoom){
            return res.send(`<script type="text/javascript">alert("이미 존재하는 닉네임입니다."); window.location = document.referrer;</script>`);
        }
        const hash = await bcrypt.hash(pw, 12);
        await User.create({
            ID: id,
            PW: hash,
            NICK: nick,
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
            return res.status(401).send(`<script type="text/javascript">alert("존재하지 않는 아이디입니다."); window.location = document.referrer;</script>`);
        }
        return req.login(user, (loginErr) => {
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            return res.redirect('/');
        });
    })(req, res, next);
};

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err){
            console.error(err);
            next(err);
        }else{
            res.redirect('/');
        }
    });
};