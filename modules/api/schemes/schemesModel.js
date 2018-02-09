const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schemesSchema = require('./schemesSchema');
const schemesModel = mongoose.model('schemes', schemesSchema, 'schemes');
const userModel = require('../users/usersModel');

const selectSchemeByIdUser = async(id) => {
    try
    {
        console.log(id);
        let listScheme = await schemesModel.find(ObjectId(id)).exec();
      
        listScheme.forEach(async function(element) {
            element.userFullname = await userModel.selectUserForScheme(element.idUser);
            console.log(element.userFullname);
        });

        return listScheme;
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

module.exports = {
    selectSchemeByIdUser
}