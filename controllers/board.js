const { Board, User } = require('../models/');
const dayjs = require("dayjs");
const viewUser = new Object();

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
    if(!viewUser[url]){
        viewUser[url] = [];
    }
    if(viewUser[url].indexOf(req.user.ID) == -1){
        viewUser[url].push(req.user.ID);
        await detailpost.update({ read: detailpost.read + 1});
        setTimeout(() => {
            viewUser[url].splice(
                viewUser[url].indexOf(req.user.ID),1
            )
        }, 600000)
        //조회수 무제한 증가 방지를 위해 10분 단위로 조회수가 증가되게 수정
        //쿠키를 사용해 방지도 가능
        for (let i in viewUser){
            if(i.length == 0){
                delete viewUser.i;
            }
        }
        /*
        const cookieParser = require('cookie-parser');
        app.use(cookieParser())

        // client ip를 가져오는 함수
        function getUserIP(req) {
            const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress
            return addr
        }

        if (req.cookies[boardId] == undefined) {
        // key, value, 옵션을 설정해준다.
        res.cookie(boardId, getUserIP(req), {
        // 유효시간 : 12분     
        maxAge: 720000
        })
        // 조회수 증가 쿼리
        await board.updateOne({ boardId }, { $inc: {'viewCount': 1}})
        }

        */
    }
    console.log(viewUser);
    res.render('boardview', {post: detailpost});
}
//res.send("<script>alert('No matching article.'); window.location.href = '/board';</script>");

exports.changePost = async(req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    if(type == 'delete'){
        await Board.destroy({where: {BID: id}});
        res.redirect('/board');
    }else if (type == 'update'){
        
    }

}

exports.uploadBoard = (req, res) => {
    console.log(req.file);
    res.json({url: `/img/${req.file.filename}`});
};

