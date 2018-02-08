const mongoose = require('mongoose');
const customersSchema = require('./customersSchema');
let customersModel = mongoose.model('customers', customersSchema);

const createCustomer = async (customer) => {
    try
    {
        return await customersModel.create(customer).exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

const updateCustomer = async (customer) => {
    try
    {
        var id = customer._id;
        var queryUpdate = {
            code : customer.code,
            name : customer.name,
            phoneNumber : customer.phoneNumber,
            address : customer.address,
            longitude : customer.longitude,
            latitude : customer.latitude,
            note : customer.note,
            contact : customer.contact
        }
    
        return await customersModel.findOneAndUpdate(id, queryUpdate).exec();
    }
    catch(err)
    {
        return null;
    }
}

const removeCustomer = async(id) => {
    try
    {
        return await customersModel.remove({_id : id}).exec();
    }
    catch(err)
    {
        return null;
    }
}

module.exports = {
    createCustomer, updateCustomer, removeCustomer
}