const {Customer, validateCustomer} = require('../models/customer'); 
const  asyncMiddleWare             = require('../middleware/async');
const  express                     = require('express');
const  route                       = express.Router();



route.get('/',asyncMiddleWare(async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
}));

route.post('/',asyncMiddleWare(async (req, res) => {
  const { error } = validateCustomer(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({ 
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
   await customer.save();
  
  res.send(customer);
}));

route.put('/:id',asyncMiddleWare(async (req, res) => {
  const { error } = validateCustomer(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    }, { new: true });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
  res.send(customer);
}));

route.delete('/:id',asyncMiddleWare(async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
}));

route.get('/:id',asyncMiddleWare(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
}));

module.exports = route; 