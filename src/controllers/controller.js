const urlModel = require("../models/urlModel")
const validUrl = require("valid-url")
const shortid = require("shortid")

const createShortUrl= async function(req,res){
    try{
        const baseUrl = 'http:localhost:3000'
        const urlCode = shortid.generate()

        let longUrl=req.body.longUrl
        if(Object.keys(req.body)==0) return res.status(400).send({status: false, message: "Invalid request, please provide details"})

        if (!validUrl.isUri(longUrl)) return res.status(400).send('Invalid long URL')

        if (validUrl.isUri(longUrl)) {
            let url = await urlModel.findOne({longUrl:longUrl})

         if(url) return res.status(200).send({status: true, data : url})
        
         const shortUrl = baseUrl + '/' + urlCode
         url = await urlModel.create({longUrl,shortUrl,urlCode})
         return res.status(201).send({status: true, data : url})
        }
        
    }catch (err) {
     return res.status(500).send({ status: false, error: err.message })
    }
}
module.exports={createShortUrl}