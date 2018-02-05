const mongoose = require('mongoose');
const userSchema = require('./usersSchema');
let usersModel = mongoose.model('users', userSchema);

const groupsSchema = require('../groups/groupsSchema');
let groupsModel = mongoose.model('groups', groupsSchema);

const createUser = (user, callback) => {
    try
    {
        usersModel.create(user, (err, doc) => {
            if (err) {
                callback(err);
            } else {
                callback(null, doc);
            }
        });
    }
    catch(err)
    {
        callback(err);
    }
}

const updateUser = (user, callback) => {
    try
    {
        var id = user._id;
        var queryUpdate = {
            email : user.email,
            fullname : user.fullname,
            dateofbirth : user.dateofbirth,
            tokenfirebase : user.tokenfirebase,
            avatar : user.avatar,
            password : user.password,
            email : user.email,
            group : user.group
        }
    
        usersModel.findOneAndUpdate(id, queryUpdate, (err, doc) => {
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

const selectUser = (user, callback) => {
    try
    {
        var queryFind = {
            username : user.username,
            password : user.password,
        }
    
        usersModel.findOne(queryFind, (err, doc) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, doc);
            }
        }).populate({
            path: 'group',
            model: groupsModel 
          }).exec();
    }
    catch(err)
    {
        callback(err);
    }
}

module.exports = {
    createUser, updateUser, selectUser
}