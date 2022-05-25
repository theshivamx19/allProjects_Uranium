const userModel = require('../models/userModel')
const vfy = require('../utility/validation')
const bcrypt = require('bcrypt');
const {
    uploadFile
} = require('../aws.config')
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUser = async function (req, res) {
    try {
        const requestBody = req.body
        console.log(vfy.isEmptyObject(requestBody))
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

        if (vfy.isEmptyVar(lname)) {
            return res.status(400).send({
                status: false,
                Message: "Please provide user's last name"
            })
        }

        if (vfy.isEmptyVar(email)) {
            return res.status(400).send({
                status: false,
                Message: "Please provide user's email"
            })
        }

        if (vfy.isEmptyVar(phone)) {
            return res.status(400).send({
                status: false,
                Message: "Please provide a vaild phone number"
            })
        }

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

        if (vfy.isEmptyVar(shipping.pincode)) return res.status(400).send({
            status: false,
            Message: "Please provide pincode name in shipping address"
        })

        if (vfy.isEmptyObject(billing)) return res.status(400).send({
            status: false,
            Message: "Please provide billing address"
        })


        // shipping address validation
        if (vfy.isEmptyVar(billing.street)) return res.status(400).send({
            status: false,
            Message: "Please provide street name in billing address"
        })

        if (vfy.isEmptyVar(billing.city)) return res.status(400).send({
            status: false,
            Message: "Please provide city name in billing address"
        })

        if (vfy.isEmptyVar(billing.pincode)) return res.status(400).send({
            status: false,
            Message: "Please provide pincode name in billing address"
        })


        const profilePicture = await uploadFile(files[0])
        const encryptedPassword = await bcrypt.hash(password, saltRounds)


        const userData = {
            fname,
            lname,
            email,
            phone,
            profileImage: profilePicture,
            password: encryptedPassword,
            address
        }

        const newUser = await userModel.create(userData);

        res.status(201).send({
            status: true,
            message: `User registered successfully`,
            data: newUser
        });

    } catch (error) {
        // console.log(error)
        res.status(500).send({
            status: false,
            Message: error.message
        })
    }
}


/*--------------------------- LOGIN ---------------------------*/
const login = async (req, res) => {
    try {
        // 💁‍♂️ get data from body
        const data = req.body
        if (vfy.isEmptyObject(data)) return res.status(400).send({
            status: !true,
            message: "☹️ Login BODY must be required!",
        })

        // 👉 de-structure data
        let {
            email,
            password
        } = data;


        // 👉 Basic validations
        if (vfy.isEmptyVar(email)) return res.status(400).send({
            status: !true,
            message: "☹️ Email address must be required!",
        })

        if (!vfy.isValidEmail(email)) return res.status(400).send({
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


/*--------------------------- UPDATE ---------------------------*/

const update = async (req, res) => {
    try {
        // 💁‍♂️ get data from body
        const data = req.body
        const userId = req.params.userId
        if (vfy.isEmptyObject(data)) return res.status(400).send({
            status: !true,
            message: "☹️ BODY must be required!",
        })

        // 👉 get User by userID
        const user = await userModel.findById(userId).catch(_ => null)
        if (!user) return res.status(404).send({
            status: !true,
            message: "☹️ User data not found!",
        })

        // 👉 de-structure data
        let {
            fname,
            lname,
            email,
            phone,
            password,
            address
        } = data


        if (!vfy.isEmptyVar(fname)) {
            user.fname = fname
        }

        if (!vfy.isEmptyVar(lname)) {
            user.lname = lname
        }

        if (!vfy.isEmptyVar(email)) {
            if (!vfy.isValidEmail(email)) return res.status(400).send({
                status: !true,
                message: "☹️ Invalid email address!",
            })
            user.email = email
        }

        if (!vfy.isEmptyVar(phone)) {
            if (!vfy.isValidPhone(phone)) return res.status(400).send({
                status: !true,
                message: "☹️ Invalid phone number!",
            })
            user.phone = phone
        }

        if (!vfy.isEmptyVar(password)) {
            if (!vfy.isValidPassword(password)) return res.status(400).send({
                status: !true,
                message: "☹️ Please enter a valid password [A-Z] [a-z] [0-9] !@#$%^& and length with in 8-15",
            })
            const encryptedPassword = await bcrypt.hash(password, saltRounds)
            user.password = encryptedPassword
        }

        if (!vfy.isEmptyVar(address)) {
            let addressObj = vfy.isValidJSONstr(address)
            if (!addressObj) return res.status(400).send({
                status: !true,
                message: "☹️ JSON address NOT in a valid structure, make it in a format!",
            })
            address = addressObj

            let {
                shipping,
                billing
            } = address

            // shipping address validation
            if (!vfy.isEmptyObject(shipping)) {
                if (!vfy.isEmptyVar(shipping.street)) {
                    user.address.shipping.street = shipping.street
                }

                if (!vfy.isEmptyVar(shipping.city)) {
                    user.address.shipping.city = shipping.city
                }

                if (!vfy.isEmptyVar(shipping.pincode)) {
                    user.address.shipping.pincode = shipping.pincode
                }
            }

            // shipping address validation
            if (!vfy.isEmptyObject(billing)) {
                if (!vfy.isEmptyVar(billing.street)) {
                    user.address.billing.street = billing.street
                }

                if (!vfy.isEmptyVar(billing.city)) {
                    user.address.billing.city = billing.city
                }

                if (!vfy.isEmptyVar(billing.pincode)) {
                    user.address.billing.pincode = billing.pincode
                }
            }

        }

        await user.save()

        res.status(200).send({
            status: true,
            Message: "User Updated successfully!",
            data: user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: !true,
            Message: error.message
        })
    }
}




module.exports = {
    createUser,
    login,
    update
}