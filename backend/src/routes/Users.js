const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

users.use(cors())

process.env.SECRET_KEY = 'secret'

const Product = require('../models/Product')
const Reviews = require('../models/Review')
const ProductImage = require('../models/ProductImage')

const User = require('../models/User')
const Transaction = require('../models/Transaction')

const Cart = require('../models/Cart')

Product.hasMany(Reviews, { foreignKey: 'product_id'})
Reviews.belongsTo(Product, { foreignKey: 'product_id'})

Product.hasMany(ProductImage, { foreignKey: 'product_id'})
ProductImage.belongsTo(Product, { foreignKey: 'product_id'})

User.hasMany(Transaction, { foreignKey: 'user_id'})
Transaction.belongsTo(User, { foreignKey: 'user_id'})

Transaction.hasMany(Cart, {foreignKey: 'transaction_id' })
Cart.belongsTo(Transaction, { foreignKey: 'transaction_id'})

users.post("/register",(req, res) => {
  const today = new Date()
  const userData = {
    user_lastname:  req.body.user_lastname,
    user_firstname: req.body.user_firstname,
    user_role:      req.body.user_role,
    user_address:   req.body.user_address,
    user_birthdate: req.body.user_birthdate,
    user_gender:    req.body.user_gender,
    user_email:     req.body.user_email,
    user_password:  req.body.user_password,
    createdAt:      today,
    updatedAt:      today
  }

  User.findOne({
      where: {
        user_email: req.body.user_email
      }
  })
  .then(user => {
    if(!user) {
      bcrypt.hash(req.body.user_password, 10, (err, hash) => {
        userData.user_password = hash
        User.create(userData)
        .then(user => {            
          Wallet.create()
          res.json({ status: user.user_email + ' succesfully registered!'})
        })
        .catch(err => {
          res.json({ error: 'Register error!'})
        })
      })
    }
    else {
      res.json({ error: 'User already exist'})
    }
  })
  .catch(err => {    
    res.send('Searching user error: ' + err)
  })
})

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      user_email: req.body.user_email
    }
  })
  .then(user => {
    if (user) {
      if (bcrypt.compareSync(req.body.user_password, user.user_password)) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        
        console.log(user)
        res.send({ 
          token:      token, 
          role:       user.user_role,
          lastname:   user.user_lastname,
          firstname:  user.user_firstname,
          email:      user.user_email,
          photo:      user.user_photo
        })
      }
    }
    else {
      res.json({ status: "Invalid email and password" })  
    }
  })
  .catch(err => {
    res.json({ status: "Login " + err })  
  })
})

users.post('/update_profile', (req, res) => {
  const today = new Date()
  User.findOne({
    where: {
      user_email: req.body.user_email
    }
  })
  .then(user => {
    if (user) {
      user.update({
        user_lastname:  req.body.user_lastname,
        user_firstname: req.body.user_firstname,
        user_address:   req.body.user_address,
        user_birthdate: req.body.user_birthdate,
        user_gender:    req.body.user_gender,
        updatedAt:      today
      })
      .then(() => {
        res.json({ status: "Profile succesfully updated!" })
      })
    }
    else {
      res.json({ status: "User not found" })
    }
  })
})

users.post('/change_email', (req, res) => {
  User.findOne({
    where: {
      user_email: req.body.old_email
    }
  })
  .then(email => {
    email.update({
      user_email: req.body.new_email
    })
    .then(() => {
      res.json({ status: '"'+ req.body.old_email  +'"' 
                + ' email succesfully updated to ' 
                + '"'+ req.body.new_email  +'"'
        })
    })
    .catch(err => {
      res.json({ error: 'Searching eail failed:' + err })
    })
  })
})

users.post('/change_password', (req, res) => {
  User.findOne({
    where: {
      user_email: req.body.old_email
    }
  })
  .then(user => {
    if (user) {
      bcrypt.compare(req.body.old_password, user.user_password, function(err, hashres) {
        if (hashres) {
          bcrypt.hash(req.body.new_password, 10, (err, hash) => {
            user.update({
              user_password: hash
            })
            .then(() => {
              res.json({ status: 'Password successfully updated' })
            })
          })
        }
        else {
          res.json({ status: "Current password did not match with old password" })  
        }
      });
    }
    else {
      res.json({ status: "Invalid email" })  
    }
  })
  .catch(err => {
    res.json({ error: 'Searcing email failed:' + err })
  })
})

users.post('/profile', (req, res) => {
  User.findOne({
    where: {
      user_email: req.body.user_email
    }
  })
  .then(user => {
    res.json({ 
      profile: { 
        user_id: user.user_id,
        user_lastname: user.user_lastname,
        user_firstname: user.user_firstname,
        user_address: user.user_address,
        user_gender: user.user_gender,
        user_birthdate: user.user_birthdate,
        user_photo: user.user_photo
      },
      credentials: {
        user_email: user.user_email,
        user_password: user.user_password,
      }
    })    
  })
})

users.post('/my_order', (req, res) => {
  User.findAll({
    subQuery: false,
    where: {
      user_email: req.body.user_email
    },
    include: [{
      model: Transaction,
      include: [{
        model: Cart,
        include: [{
          model: Product,  
          include: [{
            model: ProductImage,  
          }]
        }]
      }]
    }]
  })
  .then(user => {
    const obj = user.map(order => {
      return Object.assign({
        transactions: order.transactions.map(transaction => {
          return Object.assign({
            transaction_id:         transaction.transaction_id,
            transaction_timestamp:  transaction.transaction_timestamp,
            transaction_total:      transaction.transaction_total,
            transaction_tendered:   transaction.transaction_tendered,
            transaction_change:     transaction.transaction_change,
            transaction_method:     transaction.transaction_method,
            transaction_status:     transaction.transaction_status,
            order: transaction.carts.map(order => {
              return Object.assign({
                cart_timestamp: order.cart_timestamp,
                cart_quantity:  order.cart_quantity,
                cart_price:     order.cart_price,
                product_id:     order.product.product_id,
                product_name:   order.product.product_name,
                product_brand:  order.product.product_brand,
                product_images: order.product.product_images.map(images => {
                  return Object.assign({
                    product_img_name: images.product_img_name,
                    product_img_path: images.product_img_path
                  })
                })
              })
            })
          })
        })        
      })
    })
    res.json(obj)
  })
})

module.exports = users