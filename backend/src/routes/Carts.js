const express = require('express');
const carts = express.Router();
const cors = require('cors');

carts.use(cors())
process.env.SECRET_KEY = 'secret'

const Product = require('../models/Product')
const Cart = require('../models/Cart')

Product.hasMany(Cart, { foreignKey: 'product_id'})
Cart.belongsTo(Product, { foreignKey: 'product_id'})

carts.get('/product_sold', (req, res) => {
  
  Cart.count({
    col: 'cart_quantity'
  })
  .then(function(count) {
      // count is an integer
      res.json(count)
  });
})

module.exports = carts