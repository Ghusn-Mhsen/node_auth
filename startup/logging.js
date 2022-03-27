const winston = require('winston');
                require('winston-mongodb');
                require('express-async-errors')


module.exports = function(){


       // uncaughtException
    winston.handleExceptions(

      new winston.transports.Console({colorize:true,prettyPrint:true}),
        new winston.transports.File({
          filename: 'uncaughtException.log'
        })
      )

    // unhandledRejection
    process.on('unhandledRejection', (ex) => {

      //  throw to catch by winston.handleExceptions
      throw ex;
    });

    winston.add(new winston.transports.File({
      filename: 'logFile.log'
    }));

    winston.add(new winston.transports.MongoDB({
      db: 'mongodb://localhost/movies',
      level: 'info',
    }));
}


// 11
 // console.log('we got an  unhandledRejection...');
      // winston.error(ex.message, ex);
      // process.exit(1);



// process.on('uncaughtException',(ex)=>{
//   console.log('we got an  uncaughtException...');
//   winston.error(ex.message,ex);
// process.exit(1);
//   });