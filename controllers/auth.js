const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.join = async (req, res, next) => {
    const {id, pw, phone, gender, city, roomno} = req.body;
    try{
        const exUser = await User.findOne({where: {id}});
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrtpt.hash(pw, 12);
        await User.create({
            email,
            pw: hash,
            city,
            phone,
            roomno,
            gender
        });
        return res.redirect('/');
    }catch(error){
        console.error(error);
        return next(error);
    }
}


exports.login = async(req, res, next) => {
    
}