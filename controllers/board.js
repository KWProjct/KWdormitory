const { Board, User } = require('../models/');
const dayjs = require("dayjs");


exports.writeBoard = async(req, res, next) => {
    try{
        const {title, content, img} = req.body;
        console.log(req.body);
        const user = req.user;
        if (!title || !content) {
            res.status(400).send({ message: 'Title, Content는 필수 입력 사항입니다.' });
            return;
        }
        console.log(user);
        const write = await Board.create({
            user_id: user.ID,
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

exports.renderPost = async(req, res, next) => {
    url = req.params.id;
    console.log(url);
    detailpost = await Board.findOne({where: {BID: url}});
    res.render('boardview', {post: detailpost});
}
//res.send("<script>alert('No matching article.'); window.location.href = '/board';</script>");

exports.changePost = async(req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    console.log(`타입 ${type} id ${id}`);
    if(type == 'delete'){
        await Board.destroy({where: {BID: id}});
        await Board.update({del_yn: 'Y'}, {where: {BID: id}});
        //force: true 옵션을 추가하는 경우 완전한 삭제가 가능.
        //	where: {id: 1}, force: true,
        res.redirect('/board');
    }else if (type == 'update'){
        
    }

}

