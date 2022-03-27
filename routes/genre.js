const {
  Genre,
  validateGenre
} = require('../models/genre');
const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleWare = require('../middleware/async');
const route = express.Router();



route.get('/',asyncMiddleWare(async (req, res, next) => {

    const genres = await Genre.find().sort('name');
    res.send(genres);
  
   

  

}));

route.post('/', auth, asyncMiddleWare(async (req, res) => {
  const {
    error
  } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();

  res.send(genre);
}));

route.put('/:id', asyncMiddleWare(async (req, res) => {
  const {
    error
  } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
}));

route.delete('/:id', [auth, admin], asyncMiddleWare(async (req, res) => {

  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
}));

route.get('/:id', asyncMiddleWare(async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
}));

module.exports = route;