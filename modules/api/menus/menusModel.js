const mongoose = require('mongoose');
const menusSchema = require('./menusSchema');
let menusModel = mongoose.model('menus', menusSchema);

const findMenusByGroup = async (idgroup) => {
    try
    {
       return await menusModel.find({groups : idgroup}).exec();
    }
    catch(err)
    {
        return null;
    }
}


module.exports = {
    findMenusByGroup
}