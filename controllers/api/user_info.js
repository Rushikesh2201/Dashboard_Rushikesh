// This file contains functions related to User Management Services.

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
var db = require("../../database/models");
const Users = db.Users;

// route for getting all the records
const getUsers = async (req, res) => {
  try {
    const user = await Users.findAll();
    const total_pages = Math.ceil(user.length / 6);
    let page = parseInt(req.query.page);
    if (!page) {
      page = 1;
    }
    if (page > total_pages) {
      page = total_pages + 1;
    }

    res.json({
      page: page,
      total_page: page,
      data: user.slice(page * 6 - 6, page * 6),
    });
  } catch (err) {
    res.send("Error" + err);
  }
};

// Route for signup
const createUser =
  ([
    check("first_name", "Please enter valid first name").not().isEmpty(),
    check("last_name", "Please enter valid last name").not().isEmpty(),
    check("phone_number", "Please enter valid phone number")
      .isLength(10)
      .not()
      .isEmpty(),
    check("email", "Please enter valid email id").isEmail(),
    check("password", "Please enter valid password").isLength({ min: 8 }),
  ],
  //hanling validation errors
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { first_name, last_name, phone_number, email, password } = req.body;

    try {
      let user = await Users.findOne({
        where: { email: req.body.email },
      });

      if (user) {
        return res.status(400).json({
          message: "Users Already Exists",
        });
      }
      user = await Users.create({
        first_name,
        last_name,
        phone_number,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.status(200).json({
        message: "User created successfully",
        user,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("error in saving data");
    }
  });

// Route for Login
const loginUser =
  ([
    check("email", "Please enter Valid Email Address").isEmail(),

    check("password", "Please enter valid Password").isLength({
      min: 8,
    }),
  ],
  //   handling validation errors
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    //***initialise the table body***//
    const { email, password } = req.body;

    // Find the user exist or not
    try {
      let user = await Users.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user)
        return res.status(400).json({
          message: "Users does not Exist",
        });

      //   compare the saved password with login Password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !!!",
        });

      const payload = {
        user: {
          id: user.id,
        },
      };

      //   generating the Token
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: "2h",
        },

        (err, token) => {
          if (err) throw err;

          res.status(200).json({
            token,
          });
          console.log("Token : ", token);
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Server Error",
      });
    }
  });

module.exports = { getUsers, createUser, loginUser };
