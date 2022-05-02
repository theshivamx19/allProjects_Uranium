
const Author = require('../models/authorModel');
const jwt = require("jsonwebtoken");
const validateEmail = require('email-validator');

const creatAuthor = async (req, res) => {
  try {
    let getData = req.body;
    if((getData.fname) == 0){
      return res.status(400).send({ status: false, msg: "Enter your first Name" });
    }
    if((getData.lname) == 0){
      return res.status(400).send({ status: false, msg: "Enter your last Name" });
    }
    if((getData.title) == 0){
      return res.status(400).send({ status: false, msg: "Enter your title Name" });
    }
    if((getData.email) == 0){
      return res.status(400).send({ status: false, msg: "Enter your Email id" });
    }
    if(!validateEmail.validate(req.body.email)) return res.status(400).send({ status: false, msg: "Enter a valid email" })
    req.body.email = req.body.email.toLowerCase() 
    if((getData.password) == 0){
      return res.status(400).send({ status: false, msg: "Enter your password" });
    }

    if (Object.keys(getData).length == 0) return res.status(400).send({ status: false, msg: "Data is required to add a Author" });
    req.body.email = req.body.email.toLowerCase()
    if (!validateEmail.validate(req.body.email)) return res.status(400).send({ status: false, msg: "Enter a valid email" })

    let showAuthorData = await Author.create(getData);
    res.status(201).send({ status: true, data: showAuthorData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
}

const loginAuthor = async function (req, res) {
  try {
    let email = req.body.email;
    let password = req.body.password;
    if(!email && !password){
      res.status(400).send({msg:"email and password must be present in body"})
    }
    let getData = req.body;
    if (Object.keys(getData).length == 0) return res.status(400).send({ status: false, msg: "Data is required to add a Author" });
    let author = await Author.findOne({ email: email, password: password });
    if (!author)
      return res.status(404).send({
        status: false,
        msg: "email or the password is not corerct",
      });
    let token = jwt.sign(
      {
        authorid: author._id.toString(),
        organisation: "FunctionUp",
      },
      "functionup-uranium"
    );
    res.setHeader("x-api-key", token);
    console.log(token);
    res.status(201).send({ status: true, data: token });
  }
  catch (err) {
    res.status(500).send({ msg: "Error", error: err.message })
  }
};
module.exports.loginAuthor = loginAuthor

module.exports.creatAuthor = creatAuthor;
