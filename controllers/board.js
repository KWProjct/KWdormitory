const { Board, User } = require('../models/');

exports.writeBoard = async(req, res, next) => {
    try{
        const {title, content, img} = req.body;
        const user = req.user;
        if (!title || !content) {
            res.status(400).send({ message: 'Title, content는 필수 입력 사항입니다.' });
            return;
        }
        const write = await Board.create({
            title: title,        
            content: content,
            img: img,
            writer: user.NICK,
        });
        
        res.redirect('/board');
    }catch(err){
        console.error(err);
        next(err);
    }
}

exports.renderBoardwrite = (req, res, next) => {
    res.render('board_wr', {title: '게시판 작성'});

}

//res.send("<script>alert('No matching article.'); window.location.href = '/board';</script>");