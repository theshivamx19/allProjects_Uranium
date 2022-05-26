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


// get product list ----------------------------------------------------------------------------------->>
const getProduct = async function (req, res) {

    try {
        // 👉 fet query data 
        const query = req.query;
        const obj = {}
        const sort = {}
        if (!vfy.isEmptyObject(query)) {
            let availableSizes = query.size
            let title = query.name
            let priceGreaterThan = query.priceGreaterThan
            let priceLessThan = query.priceLessThan
            let priceSort = query.priceSort

            // if (availableSizes) { obj.availableSizes = availableSizes }
            if (!vfy.isEmptyVar(availableSizes)) { obj.availableSizes = { $in: availableSizes } }

            if (!vfy.isEmptyVar(title)) { obj.title = { $regex: title, $options: "i" } }

            if (!vfy.isEmptyVar(priceGreaterThan) && !vfy.isEmptyVar(priceLessThan)) {
                obj.price = { $gte: priceGreaterThan, $lte: priceLessThan }
            } else if (!vfy.isEmptyVar(priceGreaterThan)) {
                obj.price = { $gte: priceGreaterThan }
            }
            else if (!vfy.isEmptyVar(priceLessThan)) {
                obj.price = { $lte: priceLessThan }
            }

            if (priceSort) {
                if (priceSort != '-1' && priceSort != '1') return res.status(500).send({ status: false, Message: "priceSort only accept -1 and 1 as value" })
                sort.price = Number(priceSort)
            }

        }
        obj.isDeleted = false
        const getProductsList = await productModel.find(obj).sort(sort)
        if (!getProductsList || getProductsList.length == 0) return res.status(404).send({ status: false, Message: `product is not available in this moment try again later` })
        return res.status(200).send({ status: true, Message: `✅ ${getProductsList.length} Product${getProductsList.length == 1 ? " is" : "s are"} Matched`, data: getProductsList })

    } catch (err) {
        res.status(500).send({ status: false, Message: err.Message })
    }

}



// get product by id ----------------->>
const getProductById = async function (req, res) {
    try {
        let productId = params.productId
        if (!vfy.isValidObjectId(productId)) return res.status(400).send({ status: false, Message: '😩 Invalid productId' })

        // db call here
        const searchProduct = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!searchProduct) return res.status(404).send({ status: false, Message: '😩 prouct does not exists' })
        res.status(200).send({ status: true, Message: '✅ Success', data: searchProduct })
    }
    catch (err) {
        res.status(500).send({ status: false, Message: err.message })
    }
}




// 👉 api for delete product --------------------------------
const deleteProduct = async (req, res) => {
    try {
        //👉 get params product id
        const productId = params.productId;
        // 👉 check product id is a valid object id or not
        if (!vfy.isValidObjectId(productId)) return res.status(400).send({ status: !true, Message: "⚠️ Invalid ObjectID!" })
        //👉 find product by id
        const product = await productModel.findById(productId)
        if (!product) return res.status(404).send({ status: !true, Message: "😩 Product information unavailable!" })
        if (product.isDeleted) return res.status(400).send({ status: !true, Message: "😩 Product already deleted!" })

        // execute delete here
        product.isDeleted = true;
        product.deletedAt = new Date();
        product.save();
        res.status(200).send({ status: true, Message: "✅ Product deleted successfully!" })
    } catch (_) {
        res.status(500).send({ status: true, Message: _.message })
    }
}




module.exports = { create, getProduct, getProductById, deleteProduct }