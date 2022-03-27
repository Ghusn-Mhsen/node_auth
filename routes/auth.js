const Joi             = require('joi');
const express         = require('express');
const bcrypt          = require('bcrypt');
const {User}          = require('../models/user');
const asyncMiddleWare = require('../middleware/async');

const route = express.Router();

route.post('/',asyncMiddleWare(async (req, res) => {

    const {
        error
    } = ValidateAuth(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('Account Not Found , Please Registered First....');


    const passwordCheck = await bcrypt.compare(req.body.password, user.password);


    if (!passwordCheck) return res.status(400).send('password Wrong , Please Try Again....');

    const token = user.generateAuthToken();

    return res.send(token);


}));

function ValidateAuth(req) {

    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean(),
    });
    return schema.validate(req);
}

module.exports = route;