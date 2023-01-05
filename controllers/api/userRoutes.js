const router = require('express').Router();
const { User, Blog, Comment} = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [Blog]
    })
    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', (req, res) => {
  User.findByPk(req.params.id, {
    include: [Blog]
  }).then(user => {
    const userHbsData = user.get({plain:true});
    res.render("user", userHbsData)
  })
})

router.get('/search/:username', (req, res) => {
  User.findOne({
    where: {username: req.params.username},
    include: [Blog]
  }).then(user => {
    const usernameHbsData = user.get({ plain:true });
    res.render("user", usernameHbsData)
  })
})

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    })
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const loginUser = await User.findOne({ where: {username: req.body.username} })

    if (!loginUser) {
      res.status(400).json({ message: 'Invalid login credentials'})
      return;
    }
    const loginPassword = await loginUser.checkPassword(req.body.password)

    if (!loginPassword) {
      res.status(400).json({message: 'Invalid login credentials'})
      return;
    }

    req.session.save(() => {
      req.session.user_id = loginUser.id
      req.session.loggedIn = true
      req.session.cookie
      res.status(200).json({ user: loginUser, message: 'Successful login'})
    })
  } catch (err) {
    res.status(400).json(err)
  }
})

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})


module.exports = router