const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const schemesSchema = new Schema(
    {
        idCustomer : {type : ObjectId, require : true},
        idUser : {type : ObjectId, require : true},
        idSchemeProducts : [{type : ObjectId, require : true}],
        status : {type : Number, require : true}
    }, {timestamps : {createAt : 'created_at', updateAt : 'updated_at'}}
);

module.exports = schemesSchema;
