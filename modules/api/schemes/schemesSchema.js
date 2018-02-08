const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const schemesSchema = new Schema(
    {
        
    }, {timestamps : {createAt : 'created_at', updateAt : 'updated_at'}}
);

module.exports = schemesSchema;