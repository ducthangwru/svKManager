const mongoose = require('mongoose');
const menusSchema = require('./menusSchema');
let menusModel = mongoose.model('menus', menusSchema);

const findAllMenus = async ({}) => {
    try
    {
       return await menusModel.find({}).exec();
    }
    catch(err)
    {
        return null;
    }
}


module.exports = {
    findAllMenus
}