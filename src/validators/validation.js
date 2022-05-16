const mongoose = require("mongoose");

const isValidField = function (value) 
{
    if (typeof value === 'undefined' || value === null) return false;

    if (typeof value === 'string' && value.trim().length === 0) return false;

    return true;
};
  
const isValidRequestBody = function (requestBody) 
{
   return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (objectId)
{
  return mongoose.Types.ObjectId.isValid(objectId);
};

const isValidTitle = function (title)
{
    return ["Mr","Mrs","Miss"].indexOf(title)!=-1;
};
const isvalidNumber = function(phone){
  return ( /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).test(phone)
}
const isValidEmail = function(email)
{
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
};

const isValidReleaseDate = function(releasedAt){
    const dateExp = new RegExp(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/);
    console.log(`dateExp.test(releasedAt) ${dateExp.test(releasedAt)}`)
    return dateExp.test(releasedAt);
    //return dateStringToDate(releasedAt)
}



module.exports={isValidField,isValidRequestBody,isValidObjectId,isValidEmail,isValidTitle,isValidReleaseDate,isvalidNumber};