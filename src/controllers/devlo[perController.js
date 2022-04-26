const batchModel= require("../models/batchModel")
const devlopetrModel= require("../models/devloper.Model")
/*
2. Write an api POST  /developers that creates a developer from the details in the request body. Please note that 
the gender should be an enum with the following allowed values - male, female and other. Also, batch attribute is 
a reference to the batches collection.

*/
const createdevloper= async function (req, res) {
    let devloper = req.body
    let devloperCreated = await devlopetrModel.create(devloper)
    res.send({data: devloperCreated})
}
/*   

3. Write an api GET /scholarship-developers that fetches the list of eligible developers for scholarship. An eligible
 developer is female with percentage greater than or equal to 70
*/
const scholarshipdevelopers= async function(req, res) {
    let alldevlopers = await devlopetrModel.find({$in:[ {gender: female},{ percentage: {$gte: 70}}]}).select({name:1,_id:0})
    res.send({msg: alldevlopers })
}
/*4. Write an api GET /developers?percentage=value1&program=value2 that only returns the developers for a given program
 with a percentage greater than or equal to the received value. Please note the batch name and the program values are 
 received in the request as query params.
For example:- GET /developers?percentage=55&program=radium should return all the developers from radium batch with 
a percentage greater than or equal to 55
*/
 const devlopers = async (req, res) => {
    
     let findbatch_id = await batchModel.find({name:req.query.program})
    let eligible = await devlopetrModel.find({batch:findbatch_id,percentage:{$gte:req.query.percentage}}).select({name:1,gender:1,percentage:1,_id:0})
    if(eligible.length)res.send({msg:eligible})
    else res.send({msg:"no devlopers"})
 }
 const hi= async function(req, res) {
     let a = req
    console.log(a)
}
 module.exports.hi= hi
 module.exports.devlopers= devlopers

module.exports.createdevloper= createdevloper
module.exports.scholarshipdevelopers= scholarshipdevelopers
