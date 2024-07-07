const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.join = async (req, res, next) => {
    const {id, pw, gender, city, roomno, phone} = req.body;
    console.log(id, pw, gender, city, roomno, phone);
    try{
        const exUser = await User.findOne({where: {id}});
        if(exUser){
            res.send('중복된 아이디입니다.');
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
    
}