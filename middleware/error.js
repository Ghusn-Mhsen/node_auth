const winston = require('winston');


module.exports = function(err,req,res,next){

   winston.error(err.message,err);
    res.status(500).send('Something Failed on Server....');
  };


    // log the exception...

   /*
   - error
   - warn
   - info
   - verbose
   - debug
   - silly

   EX : winston.log('error',err.message);
   */ 