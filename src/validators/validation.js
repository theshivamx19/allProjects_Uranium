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

const isValidEmail = function(email)
{
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
};

const isValidReleaseDate = function(releasedAt){
    return dateStringToDate(releasedAt) != null
}

function dateStringToDate(dateString) {
    try {
      var year = dateString.substring(0, 4);
      var month = dateString.substring(4, 6);
      var day = dateString.substring(6, 8);
      var date = new Date(year, month - 1, day);
      const offset = date.getTimezoneOffset()
      date = new Date(date.getTime() - (offset * 60 * 1000));
      return date;
    } catch (error) {
      return null;
    }
  }

module.exports={isValidField,isValidRequestBody,isValidObjectId,isValidEmail,isValidTitle,isValidReleaseDate};