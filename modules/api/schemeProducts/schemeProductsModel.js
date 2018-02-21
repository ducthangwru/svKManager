const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schemeProductsSchema = require('../schemeProducts/schemeProductsSchema');
const schemeProductsModel = mongoose.model('schemeProducts', schemeProductsSchema, 'schemeProducts');


const createSchemeProduct = async(schemeProduct) => {
    try
    {
        return await schemeProductsModel.create(schemeProduct);
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

module.exports = {
    createSchemeProduct
}