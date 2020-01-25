const express = require('express');
const reviews = express.Router();
const cors = require('cors');

reviews.use(cors())
process.env.SECRET_KEY = 'secret'

const Product = require('../models/Product')
const Reviews = require('../models/Review')
const User = require('../models/User')

Product.hasMany(Reviews, { foreignKey: 'product_id'})
Reviews.belongsTo(Product, { foreignKey: 'product_id'})

User.hasOne(Reviews, { foreignKey: 'account_id'})
Reviews.belongsTo(User, { foreignKey: 'account_id'})

// Product.hasMany(ProductImage, { foreignKey: 'product_id'})
// ProductImage.belongsTo(Product, { foreignKey: 'product_id'})

reviews.post('/product_reviews', (req, res) => {
  Product.findOne({
    where:{
      product_name: req.body.product_name
    },
    include:[{
      model: Reviews,
      include:[{
        model: User
      }]
    }]
  })
  .then(product => {   
    const obj = product.reviews.map(reviews => {
      return Object.assign({
        review_rating: reviews.review_rating,
        review_comment: reviews.review_comment,
        user_lastname: reviews.user.user_lastname,
        user_firstname: reviews.user.user_lastname
      })
    })    
    res.json({reviews: obj })  
  })
})
module.exports = reviews