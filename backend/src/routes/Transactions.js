const express = require('express');
const transactions = express.Router();
const cors = require('cors');

transactions.use(cors())
process.env.SECRET_KEY = 'secret'

const Wallet = require('../models/Product')
const User = require('../models/User')
const Transaction = require('../models/Transaction')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const ProductImage = require('../models/ProductImage')

User.hasMany(Transaction, { foreignKey: 'user_id'})
Transaction.belongsTo(User, { foreignKey: 'user_id'})

Transaction.hasMany(Cart, {foreignKey: 'transaction_id' })
Cart.belongsTo(Transaction, { foreignKey: 'transaction_id'})

Product.hasMany(ProductImage, { foreignKey: 'product_id'})
ProductImage.belongsTo(Product, { foreignKey: 'product_id'})

transactions.post('/confirm_order', (req, res) => {

  const today = new Date();
  const transaction_data = {
    transaction_timestamp:  today, 
    transaction_total:      req.body.transaction_data.transaction_total, 
    transaction_tendered:   req.body.transaction_data.transaction_tendered, 
    transaction_change:     req.body.transaction_data.transaction_change, 
    transaction_method:     req.body.transaction_data.transaction_method, 
    transaction_status:     req.body.transaction_data.transaction_status,
    user_id:                req.body.transaction_data.user_id
  }

  var cart_list = []

  Transaction.create(transaction_data)
  .then(transaction => {
    for (let i = 0; i < req.body.cart_list.length; i++) {
      cart_list.push({
        cart_timestamp: today,
        cart_quantity:  req.body.cart_list[i].product_current_qty,
        cart_price:     req.body.cart_list[i].product_price,
        product_id:     req.body.cart_list[i].product_id,
        transaction_id: transaction.transaction_id
      })
    }
    Cart.bulkCreate(cart_list)
    
    for (let y = 0; y < cart_list.length; y++) {
      // console.log(cart_list[y].product_id)
      // console.log(cart_list[y].cart_quantity)
      Product.findOne({
        where: {
          product_id: cart_list[y].product_id
        }
      })
      .then(product => {             
        product.update({
          product_quantity: product.product_quantity - cart_list[y].cart_quantity
        })
        .then(res => {
          console.log(product.product_quantity)
          console.log(cart_list[y].cart_quantity)
        })
      }) 
    }
  })
})

transactions.get('/transactions', (req, res) => {
  Transaction.findAll({
    include: [{
      model: User 
    }]
  })
  .then(transaction => {
    var transaction_list = transaction.map(transaction => {
      return Object.assign({
        transaction_id:         transaction.transaction_id,
        transaction_timestamp:  transaction.transaction_timestamp,
        transaction_total:      transaction.transaction_total,
        transaction_tendered:   transaction.transaction_tendered,
        transaction_change:     transaction.transaction_change,
        transaction_method:     transaction.transaction_method,
        transaction_status:     transaction.transaction_status,
        user_fullname: transaction.user.user_firstname + ' ' + transaction.user.user_lastname
      })
    })
    res.json({ transaction: transaction_list })
  })
})

transactions.post('/view_transaction', (req, res) => {
  Transaction.findAll({
    subQuery: false,
    where: {
      transaction_id: req.body.transaction_id
    },
    include: [{
      model: Cart,
      include: [{
        model: Product,
        include: [{
          model: ProductImage,
        }]
      }]
    },
    {
      model: User, 
    }
    ]
  })
  .then(transaction => {
    var view_transaction = transaction.map(transaction => {
      return Object.assign({
        transaction: {
          transaction_id:         transaction.transaction_id,
          transaction_timestamp:  transaction.transaction_timestamp,
          transaction_total:      transaction.transaction_total,
          transaction_tendered:   transaction.transaction_tendered,
          transaction_change:     transaction.transaction_change,
          transaction_method:     transaction.transaction_method,
          transaction_status:     transaction.transaction_status,
        },
        user: {
          user_id:        transaction.user.user_id,
          user_lastname:  transaction.user.user_lastname,
          user_firstname: transaction.user.user_firstname,
          user_address:   transaction.user.user_address,
          user_email:     transaction.user.user_email,
          user_photo:     transaction.user.user_photo,
        },
        cart: transaction.carts.map(cart => {
          return Object.assign({         
            product_id:           cart.product.product_id,
            cart_quantity:        cart.cart_quantity,
            cart_price:           cart.cart_price,
            product_name:         cart.product.product_name,
            product_brand:        cart.product.product_brand,
            product_description:  cart.product.product_description ,
            product_images:       cart.product.product_images.map(images => {
              return Object.assign( {
                product_img_name: images.product_img_name ,
                product_img_path: images.product_img_path,
              })
            }) 
          })
        })
      })
    })
    res.json(view_transaction)
  })
})
transactions.post('/transaction_tendered', (req, res) => {
  Transaction.findOne({
    where: {
      transaction_id: req.body.transaction_id
    }
  })
  .then(transaction => {
    if (transaction) {
      if (transaction.transaction_total <= req.body.transaction_tendered) {
        transaction.update({
          transaction_change: req.body.transaction_tendered - transaction.transaction_total,
          transaction_tendered: req.body.transaction_tendered 
        })
        .then(() => {
          res.json({ status: "Tendered successfully updated" })
        })
      }
      else {
        res.json({ status: "Not Enough Money" })
      }
    }
  })
})

transactions.post('/transaction_status', (req, res) => {
  Transaction.findOne({
    where: {
      transaction_id: req.body.transaction_id
    }
  })
  .then(transaction => {
    if (transaction) {
      transaction.update({
        transaction_status: req.body.transaction_status
      })
      .then(() => {
        res.json({ status: "Status successfully updated" }) 
      })
    } 
  })
})
module.exports = transactions