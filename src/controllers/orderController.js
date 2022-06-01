const mongoose = require('mongoose')
const orderModel = require('../model/orderModel')
const vfy = require('../utility/validation')

const createOrder = async function (req, res) {

    try {let requestBody = req.body;
        const userIdInParams = req.params.userId

        //  Authroization is being checked through Auth(Middleware)
        
        const { userId, totalPrice, totalItems, items, totalQuantity } = requestBody

        if (vfy.isEmptyObject(requestBody)){return res.status(400).send({ status: false, Message: 'Please provide cart details' });}

        if (!vfy.isValidObjectId(userId)){return res.status(400).send({ status:false, Message: 'userid is required in the request body' })}

        if (vfy.isEmptyVar(userId)){return res.status(400).send({ status: false, Message: `${userId} is not a valid user id` })}






        const createProduct = await orderModel.create(requestBody);

        res.status(200).send({ status: true, Message: 'sucesfully created order', data: createProduct })

    } catch (error){res.status(500).send({ status: false, Message: error.message })}
}

module.exports = {createOrder}