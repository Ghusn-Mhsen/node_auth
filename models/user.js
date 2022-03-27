const Joi        = require('joi');
const jwt        = require('jsonwebtoken');
const mongoose   = require('mongoose');
const config     = require('config');


const UserSchema = mongoose.Schema({
    name: {
        type      : String,
        required  : true,
        minlength : 3,

    },
    email: {
        type     : String,
        required : true,
        unique   : true,
        minlength: 5,

    },
    password: {
        type     : String,
        required : true,
        minlength: 5,


    },
    isAdmin: Boolean
});

UserSchema.methods.generateAuthToken = function () {

    const token = jwt.sign({
        _id    : this._id,
        isAdmin: this.isAdmin
    }, config.get("jwtPrivateKey"));

    return token;
}

const User = new mongoose.model('user', UserSchema);

function ValidateUser(user) {

    const schema = Joi.object({
        name    : Joi.string().min(3).max(50).required(),
        email   : Joi.string().required().min(5).max(255).email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin :Joi.boolean(),
    });
    return schema.validate(user);
}



module.exports.User         = User;
module.exports.ValidateUser = ValidateUser