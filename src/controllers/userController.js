const userModel = require('../models/userModel')
const vfy = require('../utility/validation')
const bcrypt = require('bcrypt');
const {
    uploadFile
} = require('../aws.config')
const jwt = require('jsonwebtoken');
const saltRounds = 10;

//======================== #Post Api {Creat User}👦👦 ==============😍============================>>

const createUser = async function (req, res) {
    try {
        const requestBody = req.body
        //console.log(vfy.isEmptyObject(requestBody))
        if (vfy.isEmptyObject(requestBody)) {
            return res.status(400).send({
                status: false,
                Message: "Invalid request parameters, Please provide user details"
            })
        }

        let {
            fname,
            lname,
            email,
            phone,
            password,
            address
        } = requestBody

        const files = req.files
        if (vfy.isEmptyFile(files)) {
            return res.status(400).send({
                status: false,
                Message: "Please provide user's profile picture"
            })
        }

        if (vfy.isEmptyVar(fname)) {
            return res.status(400).send({
                status: false,
                Message: "Please provide user's first name"
            })
        }

        if (vfy.isEmptyVar(lname)) { return res.status(400).send({status: false,Message: "Please provide user's last name"})}

        if (vfy.isEmptyVar(email)) { return res.status(400).send({ status: false, Message: "Please provide user's email" }) }

        if (!vfy.isValidEmail(email)) return res.status(400).send({ status: false, Message: "please enter valid email" });
        
        if (vfy.isEmptyVar(phone)) { return res.status(400).send({ status: false, Message: "Please provide a vaild phone number" }) }

        if (!vfy.isValidPhone(phone)) return res.status(400).send({ status: false, Message: "please enter valid phone number" });
        
        if (vfy.isEmptyVar(password)) {
            return res.status(400).send({
                status: false,
                Message: "Please provide password"
            })
        }

        if (vfy.isEmptyVar(address)) {
            return res.status(400).send({
                status: false,
                Message: "Please provide address"
            })
        }

        const addressObject = vfy.isValidJSONstr(address)

        if (!addressObject) {
            return res.status(400).send({ status: false, Message: "Address json you are providing is not in a valid format 🤦‍♂️😂🤣" })
        }

        address = JSON.parse(address)
        let {
            shipping,
            billing
        } = address

        if (vfy.isEmptyObject(shipping)) return res.status(400).send({
            status: false,
            Message: "Please provide  shipping address"
        })

        // shipping address validation
        if (vfy.isEmptyVar(shipping.street)) return res.status(400).send({
            status: false,
            Message: "Please provide street name in shipping address"
        })

        if (vfy.isEmptyVar(shipping.city)) return res.status(400).send({
            status: false,
            Message: "Please provide city name in shipping address"
        })

        if (vfy.isEmptyVar(address)) return res.status(400).send({ status: false, Message: "Plz enter address..!!" });
        if (vfy.isEmptyVar(shipping)) return res.status(400).send({ status: false, Message: "Plz enter shipping address.!!" });
        if (vfy.isEmptyVar(billing)) return res.status(400).send({ status: false, Message: "Plz enter billing address.!!" });
        if (vfy.isEmptyVar(shipping.street)) return res.status(400).send({ status: false, Message: "Plz enter shipping street..!!" });
        if (vfy.isEmptyVar(shipping.city)) return res.status(400).send({ status: false, Message: "Plz enter shipping city..!!" });
        if (vfy.isEmptyVar(shipping.pincode)) return res.status(400).send({ status: false, Message: "Plz enter shopping pincode" });
        if (!vfy.isPincodeValid(shipping.pincode)) return res.status(400).send({ status: false, Message: "Plz enter a valid pincode" });
        if (vfy.isEmptyVar(billing.street)) return res.status(400).send({ status: false, Message: "Plz enter billing street..!!" });
        if (vfy.isEmptyVar(billing.city)) return res.status(400).send({ status: false, Message: "Plz enter billing city..!!" });
        if (vfy.isEmptyVar(billing.pincode)) return res.status(400).send({ status: false, Message: "Plz enter billing pincode" });
        if (!vfy.isPincodeValid(billing.pincode)) return res.status(400).send({ status: false, Message: "Plz enter a valid pincode" });

        //=================================Unique Db calls (Time saving)======================>>

        let usedEmail = await userModel.findOne({ email: email });
        if (usedEmail) return res.status(400).send({ status: false, msg: "This email is already registerd" });

        let usedMobileNumber = await userModel.findOne({ phone: phone });
        if (usedMobileNumber) return res.status(400).send({ status: false, msg: "This Mobile no. is already registerd" });


        const profilePicture = await uploadFile(files[0])
        const encryptedPassword = await bcrypt.hash(password, saltRounds)


        const userrequestBody = {
            fname,
            lname,
            email,
            phone,
            profileImage: profilePicture,
            password: encryptedPassword,
            address
        }

        const newUser = await userModel.create(userrequestBody);

        res.status(201).send({
            status: true,
            message: `User registered successfully`,
            data: newUser
        });

    } catch (error) {
        res.status(500).send({
            status: false,
            Message: error.message
        })
    }
}

//======================== #login Api 🔐🔑🗝️ ======================🙂=========>>

const login = async (req, res) => {
    try {
        // 💁‍♂️ get data from body
        const data = req.body
        if (vfy.isEmptyObject(data)) return res.status(400).send({
            status: !true,
            message: "☹️ Login BODY must be required!",
        })

        // 👉 de-structure data ❤️
        let {
            email,
            password
        } = data;


        // 👉 Basic validations
        if (vfy.isEmptyVar(email)) return res.status(400).send({
            status: !true,
            message: "☹️ Email address must be required!",
        })

        if (!vfy.isEmptyVarEmail(email)) return res.status(400).send({
            status: !true,
            message: "☹️ Invalid Email address!",
        })

        if (vfy.isEmptyVar(password)) return res.status(400).send({
            status: !true,
            message: "☹️ Password must be required!",
        })

        // 👉 db call for login and validation
        const user = await userModel.findOne({
            email
        })

        if (!user) return res.status(404).send({
            status: !true,
            message: `☹️ ${email} - related user does't exist!`,
        })

        // 🔐 vfy the password
        const verify = await bcrypt.compare(password, user.password).catch(_ => {
            console.log(_.message)
            return !true
        })

        if (!verify) return res.status(401).send({
            status: !true,
            message: `❌ Wrong Email address or Password!`,
        })

        // 🔐 generate Token one hr
        const Token = jwt.sign({
            userId: user._id
        }, 'secret', {
            expiresIn: '1h'
        });

        // ✅ all good
        res.status(200).send({
            status: true,
            message: `😄User Logged-in Successfully!`,
            data: {
                userId: user._id,
                token: Token
            }
        })
    } catch (error) {
        // console.log(error)
        res.status(500).send({
            status: !true,
            Message: error.message
        })
    }
}

//==========================================#Get Api (Get User) ============================================>>

const getUser = async function (req, res) {
    try {
        let userId = req.params.userId 
        let user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).send({ status: false, Message: "No such user found" })
        }
        return res.status(200).send({ status: true, data: user })
    }
    catch (err) {
        return res.status(500).send({ status: false, Message: err.message })
    }   
}

module.exports = {createUser,login, getUser}