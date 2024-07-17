//모델 불러오기
const { Board, User } = require('../models/');

exports.renderJoin = (req, res) => {
    res.render('join', {title: '회원 가입'});
};

exports.renderMain = (req, res, next) => {
    res.render('main', {title: '메인 페이지'});
}
/*
exports.jusoPop = (req, res) => { 
    res.render('jusopop',{title: '주소 찾기'});
}

exports.jusoSave = (req, res) => {
    res.locals = req.body;
    res.render('jusopop');
}
*/
exports.renderBoard1 = async (req, res, next) => {
    try{
        const board1 = await Board.findAll({
            include:{
                model: User,
            },
            order: [['createdAt', 'DESC']]
        });
        res.render('main', {
               title: 'NodeBird',
               twits: posts,
           });
    }catch(err){
        console.error(err);
        next(err);
    }
}


exports.login = (req, res) => {
    res.render('login');
}

exports.renderBoard = async(req, res, next) => {
    try{
        const board = await Board.findAll({
            include:{
                model: User,
                attributes: ['NICK'],
            },
            order: [['createdAt', 'DESC']]
        });
        res.render('board', {
            title: 'LeaderBoard',
            posts: board,
        });
    }catch(err){
        console.error(err);
        next(err);
    }
}

exports.renderMyPage = (req, res) => {
    res.render('mypage');
}