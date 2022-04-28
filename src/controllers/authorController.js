const Author = require('../models/authorModel');
const validateEmail = require('email-validator');

const addAuthor = async (req, res) => {
  try {
    let getData = req.body;
    if (Object.keys(getData).length == 0) return res.status(400).send({ status: false, msg: "Data is required to add a Author" });

    if(!validateEmail.validate(req.body.email)) return res.status(400).send({ status: false, msg: "Enter a valid email" })

    let showAuthorData = await Author.create(getData);
    res.status(201).send({ status: true, data: showAuthorData });
  } catch(err) {
    res.status(500).send({ status: false, msg: err.message });
  }
}

module.exports.addAuthor = addAuthor;