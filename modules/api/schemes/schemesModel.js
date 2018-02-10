const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schemesSchema = require('./schemesSchema');
const schemesModel = mongoose.model('schemes', schemesSchema, 'schemes');

const customersSchema = require('../customers/customersSchema');
const customersModel = mongoose.model('customers', customersSchema, 'customers');

const usersSchema = require('../users/usersSchema');
const usersModel = mongoose.model('users', usersSchema, 'users');

const schemeProductsSchema = require('../schemeProducts/schemeProductsSchema');
const schemeProductsModel = mongoose.model('schemeProducts', schemeProductsSchema, 'schemeProducts');

const productsSchema = require('../products/productsSchema');
const productsModel = mongoose.model('products', productsSchema, 'products');

const statusSchemesSchema = require('../statusSchemes/statusSchemesSchema');
const statusSchemes = mongoose.model('statusSchemes', statusSchemesSchema);

const selectSchemeByIdUser = async(id) => {
    try
    {
        console.log(id);

        schemesSchema.virtual('statusSchemess', {
            ref: 'statusSchemes',
            localField: 'status',
            foreignField: 'idStatus',
            justOne: true // for many-to-1 relationships
          });

        return await schemesModel.find(ObjectId(id))
        .populate
        (
            {
                path : 'customer',
                model : customersModel
            }
        )
        .populate
        (
            {
                path : 'user',
                model : usersModel,
                select : 'fullname'
            }
        )
        .populate
        (
            {
                path : 'schemeProducts',
                model : schemeProductsModel,
                populate : {path : 'product', model : productsModel}
            }
        )
        .populate
        (
            'statusSchemess'
        )
        .exec();
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