const express = require('express');
const Router = express.Router();
const qrcodesModel = require('./qrcodesModel');
const config = require('../../../configString.json');
const Utils = require('../../../utils/Utils');

Router.post('/', async(req, res) => {
    try
    {
        let qrcode = {
            code : req.body.code,
            status : req.body.status
        }

        if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
        {
            res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        }
        else
        {
            let result = await qrcodesModel.createQRCode(qrcode);
            if(result === -1)
                res.send({status : false, msg : config.DA_TON_TAI});
            else if(result === 0)
                res.send({status : false, msg : config.CO_LOI_XAY_RA});
            else
                res.send({ status : true, msg : config.THANH_CONG});
        }
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

Router.delete('/', async(req, res) => {
    try
    {
        if(!Utils.verifyLogin(req.query.idlogin, req.headers['token']))
        {
            res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        }
        else
        {
            let result = await qrcodesModel.removeQRCode(req.query.id);
            if(result === -1)
            res.send({status : false, msg : config.KHONG_THE_XOA});
            else if(result === 0)
                res.send({status : false, msg : config.CO_LOI_XAY_RA});
            else
                res.send({ status : true, msg : config.THANH_CONG});
        }
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

module.exports = Router;