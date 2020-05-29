const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require('multer');
// const uuidv4 = require('uuid/v4');
const { uuid } = require('uuidv4');



const DIR = '../Backend/Public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuid() + '-' + fileName)
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});


//User Model
const User = require("../Models/User");


router.get("/", (req, res) => {
  User.find().then((users) => res.json(users));
});

//test if user already exist !
// @route  POST api/users
// @desc   Create A User with beta Crypt
// @access Public

router.post("/", (req, res, next) => {
  const {
    username,
    email,
    password,
    confirmPassword,
    imageUser,
    imageCover,
    dataOfBirth,
    aboutUser,
    country,
    activate,
    banned,
    createdAt,
    role,
    followers
  } = req.body;

  // Test if user exist Already
  User.findOne({ email }).then((user) => {
    if (user) return res.sendStatus(409);
    else {
      const newUser = new User({
        username,
        email,
        password,
        confirmPassword,
        imageUser,
        imageCover,
        dataOfBirth,
        aboutUser,
        country,
        activate,
        banned,
        createdAt,
        role,
        followers
      });

      // Code the password using bcrypt module
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.confirmPassword=hash;
          newUser
            .save()
            .then((newuser) => res.json(newuser))
            .catch((err) => res.send(err));
        });
      });
    }
  });
});

// @route  LOGIN api/login
// @desc   Login into an Account
// @access Public

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) res.sendStatus(409);

    else {
      bcrypt
        .compare(password, user.password)
        .then((isMatched) => {
          if (isMatched) {
            const payload = {
              id: user._id,
              username: user.username,
              email: user.email,
              imageUser: user.imageUser,
              imageCover: user.imageCover,
              dataOfBirth: user.dataOfBirth,
              aboutUser: user.aboutUser,
              country: user.country,
              createdAt: user.createdAt,
              role: user.role,
              followers:user.followers,
              activate :user.activate 
            };
            jwt.sign(payload, "session", { expiresIn: 3600 }, (err, token) => {
              if (err) res.sendStatus(500);
              else res.json({ token: "Bearer " + token });
            });
          } else res.send(400);
        })
        .catch((err) => res.send("server error"));
    }
  });
});

// @route  CURRENT api/current
// @desc   Validate token
// @access Public

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

// @route put /
// @desc Add user description
// @access Public

router.put("/:_id",upload.single('imageUser') ,(req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const { _id } = req.params;
  const {
    username,
    email,
    password,
    confirmPassword,
    imageUser,
    imageCover,
    dataOfBirth,
    aboutUser,
    country,
  } = req.body;
  User.findOneAndUpdate(
    { _id },
    {
      $set: {
        username,
        email,
        password,
        confirmPassword,
        imageUser:  url + '/public/' + req.file.filename ,
        imageCover,
        dataOfBirth,
        aboutUser,
        country,
      },
    }
  ).then(user=>res.json(user))
  .catch(err=> console.log(err))
    
  
});


// @rout get /:_id
// @desc Search one
// @access Public

router.get("/profile/:_id", (req, res) => {
  const{ _id} = req.params
  User.findOne({ _id }).then(users => res.json(users)).catch(err=> console.log(err))
});


router.get("/editProfile/:_id", (req, res) => {
  const{ _id} = req.params
  User.findOne({ _id }).then(users => res.json(users)).catch(err=> console.log(err))
});


router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

// Disable user 
router.put("/disable/:_id",(req, res, next) => {
  const { _id } = req.params;


  // console.log(response)

  User.findOneAndUpdate(
    { _id },
    {
      $set: {
        activate: false
      },
    }
  ).then(user=>res.json(user))
  .catch(err=> console.log(err))
    
  
});
router.put("/enable/:_id",(req, res, next) => {
  const { _id } = req.params;


  // console.log(response)

  User.findOneAndUpdate(
    { _id },
    {
      $set: {
        activate: true
      },
    }
  ).then(user=>res.json(user))
  .catch(err=> console.log(err))
    
  
});
router.put("/live/:_id",(req, res, next) => {
  const { _id } = req.params;


  // console.log(response)

  User.findOneAndUpdate(
    { _id },
    {
      $set: {
        live: true
      },
    }
  ).then(user=>res.json(user))
  .catch(err=> console.log(err))
});
router.put("/offLive/:_id",(req, res, next) => {
  const { _id } = req.params;


  // console.log(response)

  User.findOneAndUpdate(
    { _id },
    {
      $set: {
        live: false
      },
    }
  ).then(user=>res.json(user))
  .catch(err=> console.log(err))
});

// Post a follow
router.put("/newFollower/:id", (req, res) => {
  const _id = req.params.id;
  const  user  = req.body;
  User.findOneAndUpdate(
    { _id },
    { $push: { followers:  user } }
  )
    .then((user) => res.send(user))
    .catch((err) => console.error(err));
});

// Delete a follow
router.put("/deleteFollower/:id/:index", (req, res) => {
  console.log("params:",req.query)
  const _id = req.params.id;
  const index = req.params.index;
  console.log("id:", _id);
  console.log("index:", index);
  User.findOneAndUpdate(
    { _id },
    { $pull: { followers:{id: req.params.index } } }
  )
    .then((user) => res.send(user))
    .catch((err) => console.error(err));
});


module.exports = router;
