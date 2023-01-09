const express = require('express');
const router = require('express').Router();
const { User, Comment, Post } = require('../models')

router.get('/', async (req, res) => {
    Post.findAll({
        include: [User, Comment]
    })
    .then(posts => {
        const postHbsData = posts.map(post=>post.get({plain:true}))
        console.log(postHbsData);
        console.log('landing page connected')

        res.render('home', {
            posts: postHbsData,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        })
    })
})

router.get('/login', (req,res) => {
    if (req.session.logged_in) {
        return res.redirect('/profile')
    }
    res.render('login', {
        logged_in: false, 
        user_id: null
    })
})

router.get("/profile", (req, res) => {
    if(!req.session.logged_in) {
      return res.redirect("/login")
    }
    User.findByPk(req.session.user_id, {
      include:[Post, Comment]
    }).then(userData=>{
      const hbsData = userData.get({plain:true});
      console.log(hbsData)
     
      res.render("profile", hbsData)
    })
})


router.get("/posts/:id", (req, res) => {
    Post.findByPk(req.params.id, {
      include: [User, Comment]
    }).then((post) => {

      const postHbsData = post.get({ plain: true });
      console.log(post)

      console.log(postHbsData)
      res.render("singlePost", postHbsData);
    });
  });




module.exports = router;