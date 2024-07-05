const bcrypt = require('bcrypt');
const User = require('../models/user');

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
        return res.redirect('/');
    }catch(error){
        console.error(error);
        return next(error);
    }
}


exports.login = async(req, res, next) => {
    
}