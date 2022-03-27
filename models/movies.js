const Joi            = require('joi')
const mongoose       = require('mongoose');
const {genreSchema}  = require('./genre')



const Movie = mongoose.model(
    'Movie',
    new mongoose.Schema({
        tittle: {
            type     : String,
            required : true,
            trim     : true,
            maxlength: 255,
            minlength: 5
        },
        genre : {
            type    : genreSchema,
            required: true
        },
        numberInStocke: {
            type    : Number,
            required: true,
            min     : 0,
            max     : 255
        },
        dailyRentalRate: {
            type    : Number,
            required: true,
            min     : 0,
            max     : 255
        }
    })
)

function validateMovie(movie) {

    const schema = Joi.object({
        tittle   :Joi.string().min(5).max(50).required(),
        genre    : Joi.object().keys({
            name : Joi.string().required(),
            _id  :Joi.objectId().required(),
        }),
        numberInStocke : Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    });

    return schema.validate(movie)
};

module.exports.Movie             = Movie,
module.exports.validateMovie     = validateMovie