const sequelize = require("../config//connection")
const { User, Post, Comment } = require("../models")

const userData = [
    {
        username: "Petunia",
        password: "petuniaFlower"
    },
    {
        username: "Mum",
        password: "mumFlower"
    },
    {
        username: "Dahlia",
        password: "dahliaFlower"
    },
];

const postData = [
    {
        post_id: 1,
        title: "The Joy of Petunias",
        content: "Petunia's, though not conventionally tech related, are beautiful and part of a eccentric, elaborite web of connectivity (biodiversity) much like how we build the internet",
        user_id: 1,
       
    },
    {
        title: "The Joy of Mums",
        content: "Mums, short of Chrysanthemum, though not conventionally tech related, are beautiful and part of an eccentric, elaborite web of connectivity (biodiversity) much like how we build the internet. Yellow Chrysanthemum's are used to celebrate the Chinese Lunar New Year. The internet is an amazing tool for promoting cultural understanding, appreciation, and fighting against bias.",
        user_id: 2
    },
    {
        title: "The Joy of Dahlias",
        content: "Dahlias, though not conventionally tech related, are beautiful and part of an eccentric, elaborite web of connectivity (biodiversity) much like how we build the internet. Dahlia bulbs can be stored in peat moss, among other materials, over winter to be planted again when Spring conditions are favorable. I fell in love with Dahlias after visiting my grandfather in Washington. Never did I think I would uproot my life and move to the PNW myself, but a series of random events landed me there, and eventually led me to the UW coding bootcamp. Still love dahlias, especially thick bouquets of them.",
        user_id: 3
    },
]

const commentData = [
    {
        user_id: 3,
        post_id: 1,
        text: "Wow, Petunia, love your name, that was/is one of my mom's many nicknames for me!",
    },
    {   
        user_id: 2,
        post_id: 2,
        text: "Fantastic flower!",
    },
    {
        user_id: 1,
        post_id: 3,
        text: "Tubers rule!",
    }
];

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    const posts = await Post.bulkCreate(postData);
  
    const comments = await Comment.bulkCreate(commentData);
  };
  
  seedDatabase();