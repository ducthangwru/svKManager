const mongoose = require('mongoose');
const userSchema = require('./usersSchema');
let usersModel = mongoose.model('users', userSchema);

const groupsSchema = require('../groups/groupsSchema');
let groupsModel = mongoose.model('groups', groupsSchema);

const createUser = async(user) => {
    try
    {
        return await usersModel.create(user).exec();
    }
    catch(err)
    {
        return null;
    }
}

const updateUser = async(user) => {
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
    
        return await usersModel.findOneAndUpdate(id, queryUpdate).exec();
    }
    catch(err)
    {
        return null;
    }
}

const selectUser = async(user) => {
    try
    {
        var queryFind = {
            username : user.username,
            password : user.password,
        }
    
        return await usersModel.findOne(queryFind).populate({
            path: 'group',
            model: groupsModel 
          }).exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

const updateTokenFirebaseUser = async (iduser, tokenfirebase) => {
    try
    {
       return await menusModel.findOneAndUpdate(iduser, {tokenfirebase : tokenfirebase}).exec();
    }
    catch(err)
    {
        return null;
    }
}


module.exports = {
    createUser, updateUser, selectUser, updateTokenFirebaseUser
}