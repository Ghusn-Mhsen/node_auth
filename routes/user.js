
const  asyncMiddleWare     = require('../middleware/async');
const  bcrypt              = require('bcrypt');
const {User,ValidateUser}  = require('../models/user');
const  _                   = require('lodash');
const  express             = require('express');
const  route               = express.Router();




route.post('/',asyncMiddleWare(async (req, res) => {
    const {
        error
    } = ValidateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send('User already Registered ');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'password', 'isAdmin']));
}));

module.exports = route;