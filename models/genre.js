const mongoose = require('mongoose');
const Joi      = require('joi');

const genreSchema =new  mongoose.Schema({
    name: {
        type     : String,
        required : true,
        trim     : true,
        maxlength: 255,
        minlength: 5
    },
});


const Genre = mongoose.model('Genre',genreSchema);


function validateGenre(Genre) {

    const schema = Joi.object({

        name: Joi.string().min(3).required()
    });

    return schema.validate(Genre);
}
module.exports.genreSchema     = genreSchema;
module.exports.Genre           = Genre;
module.exports.validateGenre   = validateGenre; 

