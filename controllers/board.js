const { Board } = require('../models/board');
const { User } = require('../models/User');


exports.writeBoard = async(req, res, next) => {
    try{
        const write = await Board.create({
            title: req.body.title,        
            content: req.body.content,
            UserId: req.user.ID,
        });
        res.render('/board');
    }catch(err){
        console.error(err);
        next(err);
    }
}
exports.renderBoard = async(req, res, next) => {
    try{
        const board = await Board.findAll({
            include:{
                model: User,

            },
            order: [['createdAt', 'DESC']]
        });
        res.render('/board', {
            title: 'LeaderBoard',
            posts: board,
        });
    }catch(err){
        console.error(err);
        next(err);
    }
}

exports.renderBoardwrite = (req, res, next) => {
    res.render('board_wr', {title: '게시판 작성'});

}
