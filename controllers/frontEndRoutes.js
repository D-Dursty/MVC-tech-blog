const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../models');

router.get("/", async (req, res) => {

    Blog.findAll({
      include:[User, Comment]
    }).then((blogs) => {
      const blogsHbsData = blogs.map((blog) => blog.get({ plain: true }));
      console.log("touchdown homepage");
      res.render("home", {
        blogs: blogsHbsData,
        // logged_in: req.session.logged_in, 
        // user_id: req.session.user_id
      });
    });
  });
  
  
  
  router.get("/blog/:id", (req, res) => {
    Blog.findByPk(req.params.id, {
      include: [User]
    }).then((blog) => {
      // res.json(blogs)
      const blogHbsData = blog.get({ plain: true });
      console.log(blog)
      console.log(blogHbsData)
      res.render("singleBlog", blogHbsData);
    });
  });
  
  router.get("/login", (req, res) => {
    // if(req.session.logged_in) {
    //   return res.redirect("/profile")
    // }
      res.render("login")
  })
  
  router.get("/logout", (req, res) => {
    if(req.session.logged_in) {
      return res.redirect("/login")
    }
      res.render("login")
  })
  
  
  router.get("/profile", (req, res) => {
      // if(!req.session.logged_in) {
      //   return res.redirect("/login")
      // }
      User.findByPk(req.session.user, {
        include:[Blog, Comment]
      }).then(userData=>{
        const hbsData = userData.get({plain:true});
        console.log(hbsData)
        res.render("profile", hbsData)
      })
  })
  
  module.exports = router;