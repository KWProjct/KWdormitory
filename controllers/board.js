const { Board, User } = require('../models/');



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

exports.writeBoard = async(req, res, next) => {
    try{
        const write = await Board.create({
            title: req.body.title,        
            content: req.body.content,
            //UserId: req.user.ID,
        });
        if (!title || !content) {
            res.status(400).send({ message: 'Title, content는 필수 입력 사항입니다.' });
            return;
        }
        res.render('/board');
    }catch(err){
        console.error(err);
        next(err);
    }
}

exports.renderBoardwrite = (req, res, next) => {
    res.render('board_wr', {title: '게시판 작성'});

}
