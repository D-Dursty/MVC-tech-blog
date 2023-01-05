const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

router.get('/', (req, res) => {
  Blog.findAll({})
  .then(blogData => res.json(blogData))
  .catch(err => {
    res.status(500).json(err)
  })
})

router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      indclude: [
        {
          model: User,
          attributes: ['username']
        }, {
          model: Comment,
          include: [
            User
          ]
        }
      ],
    });
    const blog = blogData.get({ plain: true});
    res.render('blog', {
      ...blog,
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
    if(!req.session.logged_in){
      return res.status(401).json({msg:"You must be logged in to do that"})
    }
    try {
      const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    if(!req.session.logged_in){
      return res.status(401).json({msg:"You must be logged in to do that"})
    }
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'Blog post not found!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;