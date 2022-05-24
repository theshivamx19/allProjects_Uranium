const userModule = require('../models/userModel')
const vfy = require('../utility/validation')
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async function (req, res) {
    try {
        const requestBody = JSON.parse(req.body.data)
        if (!isValidRequestBody(requestBody)){
            return res.status(400).send({ status: false, Message: "Invalid request parameters, Please provide user details" })}

        const { fname, lname, email, phone, password, address } = requestBody

        const files = req.files
        if (!isValidfiles(files)){
            return res.status(400).send({ status: false, Message: "Please provide user's profile picture" })}

        if (!isValid(fname)){
            return res.status(400).send({ status: false, Message: "Please provide user's first name" })}

        if (!isValid(lname)){
            return res.status(400).send({ status: false, Message: "Please provide user's last name" })}

        if (!isValid(email)){
            return res.status(400).send({ status: false, Message: "Please provide user's email" })}

        if (!isValid(phone)){
            return res.status(400).send({ status: false, Message: "Please provide a vaild phone number" })}

        if (!isValid(password)){
            return res.status(400).send({ status: false, Message: "Please provide password" })}

        if (!isValid(address)){
            return res.status(400).send({ status: false, Message: "Please provide password" })}

        if (address){ address = JSON.parse(address)
            if (address.shipping){
                if (!isValid(address.shipping.street)){                    
                return res.status(400).send({ status: false, Message: "Please provide street name in shipping address"})}

                if (!isValid(address.shipping.city)){                    
                return  res.status(400).send({ status: false, Message: "Please provide city name in shipping address"})}

                if (!isValid(address.shipping.pincode)){
                return res.status(400).send({ status: false, Message: "Please provide pincode in shipping address"})}}


            if (address.billing){
                if (!isValid(address.billing.street)){
                    return res.status(400).send({ status: false, Message: "Please provide street name in billing address" })}

                if (!isValid(address.billing.city)){
                    return res.status(400).send({ status: false, Message: "Please provide city name in billing address" })}

                if (!isValid(address.billing.pincode)){
                    return res.status(400).send({ status: false, Message: "Please provide pincode in billing address" })}
            }
        }

        const profilePicture = await uploadFile(files[0])

        const encryptedPassword = await bcrypt.hash(password, saltRounds)

        let FEmail = email.split(' ').join('')

        const userData = {
            fname: fname, lname: lname, profileImage: profilePicture, email: FEmail,
            phone, password: encryptedPassword, address: address
        }

        const newUser = await userModel.create(userData);

        res.status(201).send({ status: true, message: `User registered successfully`, data: newUser });

    }
    catch (error) {
        res.status(500).send({ status: false, Message: error.message })
    }
}

module.exports = {createUser}