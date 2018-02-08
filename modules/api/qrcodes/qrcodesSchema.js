const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const qrcodesSchema = new Schema(
    {
        code : {type : String, require : true},
        status : {type : Number, require : true}
    }, {timestamps : {createAt : 'created_at', updateAt : 'updated_at'}}
);

let qrcodesModel = mongoose.model('qrcodes', qrcodesSchema);

qrcodesSchema.pre('save', function(next) {
    let qrcode = this;
    qrcodesModel.find({code : qrcode.code}, function (err, docs) {
        if (!docs.length)
        {
            next();
        }
        else
        {                
            //console.log('user exists: ',user.username);
            next(new Error("User exists!"));
        }
    });
});


module.exports = qrcodesSchema;