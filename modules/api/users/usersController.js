const express = require('express');
const Router = express.Router();
const usersModel = require('./usersModel');
const menusModel = require('../menus/menusModel');
const config = require('../../../configString.json');
const Utils = require('../../../utils/Utils');

Router.post('/', (req, res) => {
    try
    {
        let newUser = {
            // idlogin : req.body.idlogin,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            avatar : req.body.avatar,
            tokenfirebase : req.body.tokenfirebase,
            fullname: req.body.fullname,
            dateofbirth: req.body.dateofbirth,
            status : true,
            group :"5a6fe111734d1d63031a767a"
        };
    
        // if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
        // {
        //     res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        // }
        // else
        // {
            usersModel.createUser(newUser, (err, doc) => {
                    if (err != null) {
                        console.log(err);
                        res.send({ status : false, msg : config.KHONG_THANH_CONG});
                    } else {
                        res.send({ status : true, msg : config.THANH_CONG});
                    }
                }
            )
        //}
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

Router.put('/', (req, res) => {
    try
    {
        let newUser = {
            idlogin : req.body.idlogin,
            id: req.body._id,
            password: req.body.password,
            email: req.body.email,
            avatar : req.body.avatar,
            tokenfirebase : req.body.tokenfirebase,
            fullname: req.body.fullname,
            dateofbirth: req.body.dateofbirth,
            status : req.body.status,
            group : req.body.group
        };
        if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
        {
            res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        }
        else
        {
            usersModel.updateUser(newUser, (err, doc) => {
                if (err != null) {
                    res.send({ status : false, msg : config.KHONG_THANH_CONG});
                } else {
                    res.send({ status : true, msg : config.THANH_CONG});
                }
            });
        }
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

Router.post('/login', (req, res) => {
    try
    {
        let user = {
            username: req.body.username,
            password: req.body.password
        }

        usersModel.selectUser(user, async (err, doc) => {
            if (err != null) {
                res.send({ status : false, msg : config.KHONG_THANH_CONG, data : null, token : ""});
            } else {
                var token = Utils.getToken(doc._id);
                let menus = await menusModel.findAllMenus({});
                res.send({ status : true, msg : config.THANH_CONG, data : doc, token : token, menus : menus});
            }
        }
    )
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

module.exports = Router;