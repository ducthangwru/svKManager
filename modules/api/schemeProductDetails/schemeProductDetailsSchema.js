const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const schemeProductDetailsSchema = new Schema(
    {
        schemeProduct : {type : ObjectId, require : true},
        
    }, {timestamps : {createAt : 'created_at', updateAt : 'updated_at'}}
);

module.exports = schemeProductDetailsSchema;
