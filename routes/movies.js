const    express              = require('express');
const {  Movie,validateMovie} = require('../models/movies')
const {  Genre}               = require('../models/genre');
const asyncMiddleWare         = require('../middleware/async');
const route                   = express.Router();



route.get('/',asyncMiddleWare(async (req, res) => {
    const movies = await Movie.find().select().sort("name");
    res.send(movies);
    res.end();
}));


route.get('/:id',asyncMiddleWare(async (req, res) => {
    const movie = await Movie.find({
        _id: req.params.id
    });
    if (!movie) return res.status(404).send("Movie not found");
    res.send(movie);
    res.end();
}));


route.post('/',asyncMiddleWare(async (req, res) => {

    
    const {
        error
    } = validateMovie(req.body);

    if (error) return res.status(400).send(error.details[0].message);
  

    const genre = Genre.findById(req.body.genre._id);
    if (!genre) return res.status(400).send('Genre not Found ');

    const movie = new Movie({
        tittle: req.body.tittle,
        genre: {
            _id: req.body.genre._id,
            name: req.body.genre.name
        },
        numberInStocke: req.body.numberInStocke,
        dailyRentalRate: req.body.dailyRentalRate,
    });
   await movie.save();

    res.send(movie);
    res.end();
}));


route.put('/:id',asyncMiddleWare(async (req, res) => {
    const {
        error
    } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = Genre.findById(req.body.genre._id);
    if (!genre) return res.status(400).send('Genre not Found ');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        tittle: req.body.tittle,
        genre: {
            id: req.body.genre._id,
            name: req.body.genre.name,
        },
        numberInStocke: req.body.numberInStocke,
        dailyRentalRate: req.body.dailyRentalRate,
    }, {
        new: true
    })
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
}));


route.delete('/:id',asyncMiddleWare(async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);

}));

route.get('/:id',asyncMiddleWare(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
}));

module.exports = route;