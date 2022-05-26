const productModel = require('../models/productModels')
const vfy = require('../utility/validation')
const { uploadFile } = require('../aws.config')


// 📦 create product
const create = async (req, res) => {
    try {
        // 👉 get data from Body
        const data = { ...req.body }
        const files = req.files

        // 👉 if body OR file is empty
        if (vfy.isEmptyObject(data) && vfy.isEmptyVar(files)) return res.status(400).send({ status: !true, Message: "☹️ Product BODY required!" })

        // 👉 destructure data
        let { title, description, price, currencyId, currencyFormat, isFreeShipping, style, availableSizes, installments } = data

        // 🤯 Basic validations
        if (vfy.isEmptyVar(title)) return res.status(400).send({ status: !true, Message: "☹️ title is required!" })
        if (vfy.isEmptyVar(description)) return res.status(400).send({ status: !true, Message: "☹️ description is required!" })
        if (vfy.isEmptyVar(price)) return res.status(400).send({ status: !true, Message: "☹️ price is required!" })
        if (!Number(price)) return res.status(400).send({ status: !true, Message: "☹️ price must be a number!" })


        // if (!vfy.isEmptyVar(isFreeShipping)) {
        //     if (typeof isFreeShipping !== 'boolean') return res.status(400).send({ status: !true, Message: "☹️ isFreeShipping must be a boolean value!" })
        // }

        if (vfy.isEmptyVar(availableSizes)) return res.status(400).send({ status: !true, Message: "☹️ availableSizes is required!" })

        // 🤯 validation of availableSizes
        availableSizes = vfy.isValidJSONstr(availableSizes)
        if (!availableSizes) return res.status(400).send({ status: !true, Message: `☹️ availableSizes is accept an array json like ["S", "XS", ...] !` })
        if (!vfy.checkArrContent(availableSizes, "S", "XS", "M", "X", "L", "XXL", "XL")) return res.status(400).send({ status: !true, Message: `☹️ availableSizes is only accept S , XS , M , X , L , XXL , XL !` })

        // 👉 installments validation
        if (!vfy.isEmptyVar(installments)) {
            if (!Number(installments)) return res.status(400).send({ status: !true, Message: "☹️ installments must be a number!" })
        }

        // ⬆️ upload data validation
        if (vfy.isEmptyFile(files)) return res.status(400).send({ status: !true, Message: "☹️ productImage is required!" })
        if (!vfy.acceptFileType(files[0], 'image/jpeg', 'image/png')) return res.status(400).send({ status: !true, Message: "⚠️ we accept jpg, jpeg or png as product image only!" })

        // 👉 execute DB call
        const productTitle = await productModel.findOne({ title })
        if (productTitle) return res.status(400).send({ status: !true, Message: "☹️ title already exist!" })

        // ⬆️ upload data here ------- 👇
        const productImage = await uploadFile(files[0])

        const rawData = { title, description, price, currencyId, currencyFormat, isFreeShipping, style, availableSizes, installments, productImage }

        // ✅ all done now create product
        const createProduct = await productModel.create(rawData)
        return res.status(200).send({ status: true, Message: "✅ Product created successfully!", data: createProduct })

    } catch (_) {
        res.status(500).send({ status: !true, Message: _.message })
    }

}


module.exports = {
    create
}