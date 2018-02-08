const mongoose = require('mongoose');
const statusQRCodesSchema = require('./statusQRCodesSchema');
let statusQRCodesModel = mongoose.model('statusQRCodes', statusQRCodesSchema);

const selectAllStatus = async({}) => {
    try
    {
        console.log(await statusQRCodesModel.find({}));
        return await statusQRCodesModel.find({});
    }
    catch(err)
    {
        return null;
    }
}

module.exports = {
    selectAllStatus
}