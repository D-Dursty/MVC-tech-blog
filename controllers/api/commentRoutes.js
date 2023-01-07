const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');


router.get('/', async(req,res)=>{
    try{
        const allCommentData = await Comment.findAll();
        res.json(allCommentData);
    }catch(err){
        res.json({message:err.message})
    }
});


router.post('/', (req,res) => {
    if (req.session) {
        Comment.create({
            text: req.body.text,
            blog_id: req.body.blog_id,
            user_id: req.body.user_id
        })
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const delComment = await Comment.destroy({
            where:{
                id:req.params.id
            }})
        res.json(delComment)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;