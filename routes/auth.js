const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET = "mangeshisagood@boy";

// ROUTE 1create an User using :POST "/api/auth/createuser".Doesnt required Auth

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid Email").isEmail(),
    body("password", "password must be atleast 5 charectors").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success =false;
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check wether the user with this email already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success=false;
        return res
          .status(400)
          .json({ error: "sorry a user with this email alredy exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user);
      success= true;
      res.json({success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//ROUTE 2 authenticate a User using :POST "/api/auth/login".no login requred

router.post(
  "/login",
  [
    body("email", "enter a valid Email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    // if there are error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success =false;
        return res
          .status(400)
          .json({success, error: "try to login with correct credentials" });
      }
      const passwordCompaire = await bcrypt.compare(password, user.password);
      if (!passwordCompaire) {
        success =false;
        return res
          .status(400)
          .json({success, error: "try to login with correct credentials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(payload, JWT_SECRET);
      success =true;
      res.json({success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//ROUTE 3: get login User details using :POST "/api/auth/getuser". login requred
router.post(
  '/getuser',fetchuser,async (req, res) => {
    try {
       userId = req.user.id;
;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);
module.exports = router;
