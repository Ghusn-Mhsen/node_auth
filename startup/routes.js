const  express  = require('express');
const  genres   = require('../routes/genre');
const  movies   = require('../routes/movies');
const  customer = require('../routes/customer');
const  user     = require('../routes/user');
const  auth     = require('../routes/auth');
const  error    = require('../middleware/error');



module.exports = function(app){


    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/movies', movies);
    app.use('/api/customer', customer);
    app.use('/api/user', user);
    app.use('/api/auth', auth);
    app.use(error);

}