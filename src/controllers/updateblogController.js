const blogModel = require('../models/blogModel')


const putPublished = async function (req, res) {
    try {
        let blogid = req.params.blogId;
        let body = req.body
        if (!blogid) {
            return res.status(400).send({ status: "false", data: "blogid not present" })
        }
        let person = await blogModel.findById(blogid);
        console.log(person)
        if (!person) {
            return res.status(404).send({ status: "false", data: "the blogid is not valid" })

        }
        let isDelet = person.isDeleted;
        if (isDelet == true) {
            return res.status(400).send({ msg: false, data: "blog document has deleted" })
        }
        let published = person.isPublished
        if (published == true && Object.keys(body) != 0) {

            let result = await blogModel.findOneAndUpdate({ _id: person._id }, body, { new: true })
            res.status(200).send({ data: result })
        }
        else if (published == true && Object.keys(body) == 0) {
            res.status(400).send({ msg: "already published" })
        } else if (published == false && Object.keys(body) == 0) {
            let result = await blogModel.findOneAndUpdate({ _id: person._id }, { isPublished: true, publishedAt: Date.now() }, { new: true })
            res.send({ data: result })
        }else {
            let result = await blogModel.findOneAndUpdate({ _id: person._id }, body, { new: true })
            res.status(200).send({ data: result })
        
        }

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "error", error: err.message })
    }
}

module.exports.putPublished = putPublished
