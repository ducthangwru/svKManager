const mongoose = require('mongoose');
const groupsSchema = require('./groupsSchema');
let groupsModel = mongoose.model('groups', groupsSchema);

const findByIdGroup = (idgroup, callback) => {
    try
    {
        groupsModel.findById(id, (err, doc) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, doc);
            }
        })
    }
    catch(err)
    {
        callback(err);
    }
}


module.exports = {
    findByIdGroup
}