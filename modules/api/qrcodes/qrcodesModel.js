const mongoose = require('mongoose');
const qrcodesSchema = require('./qrcodesSchema');
let qrcodesModel = mongoose.model('qrcodes', qrcodesSchema);

const createQRCode = async(qrcode) => {
    try
    {
        let result = await qrcodesModel.find({code : qrcode.code}).exec();
        if(result.length == 0)
            return await qrcodesModel.create(qrcode);
        else
            return -1;
    }
    catch(err)
    {
        return 0;
    }
}

const findQRCodebyCode = async(code) => {
    try
    {
        return await qrcodesModel.findOne({code : code}).exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

const updateQRCode = async(idQRCode, status) => {
    try
    {
        var id = idQRCode;
        var queryUpdate = {
            status : status
        }
    
        return await qrcodesModel.findOneAndUpdate(id, queryUpdate).exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

const removeQRCode = async(id) => {
    try
    {
        return await qrcodesModel.remove({_id : id}).exec();
    }
    catch(err)
    {
        console.log(err);
        return 0;
    }
}

module.exports = {
    createQRCode, removeQRCode, findQRCodebyCode, updateQRCode
}