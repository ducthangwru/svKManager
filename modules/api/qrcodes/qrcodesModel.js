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

const removeQRCode = async(id) => {
    try
    {
        let result = await qrcodesModel.find({_id : id, status : {$ne : 1}}).exec();
        if(result.length != 0)
            return await qrcodesModel.remove({_id : id}).exec();
        else 
            return -1;
    }
    catch(err)
    {
        return 0;
    }
}

module.exports = {
    createQRCode, removeQRCode
}