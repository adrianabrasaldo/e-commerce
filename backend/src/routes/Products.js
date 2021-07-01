const express = require('express');
const products = express.Router();
const cors = require('cors');
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage });

const Category = require('../models/Category')
const SubCategory = require('../models/SubCategory')
const Product = require('../models/Product')
const Reviews = require('../models/Review')
const ProductImage = require('../models/ProductImage')

const User = require('../models/User')
const Transaction = require('../models/Transaction')

const Cart = require('../models/Cart')

Category.hasMany(SubCategory, { foreignKey: 'category_id' })
SubCategory.belongsTo(Category, { foreignKey: 'category_id' })

SubCategory.hasMany(Product, { foreignKey: 'sub_category_id' })
Product.belongsTo(SubCategory, { foreignKey: 'sub_category_id' })

Product.hasMany(Reviews, { foreignKey: 'product_id' })
Reviews.belongsTo(Product, { foreignKey: 'product_id' })

Product.hasMany(ProductImage, { foreignKey: 'product_id' })
ProductImage.belongsTo(Product, { foreignKey: 'product_id' })

User.hasMany(Transaction, { foreignKey: 'user_id' })
Transaction.belongsTo(User, { foreignKey: 'user_id' })

Transaction.hasMany(Cart, { foreignKey: 'transaction_id' })
Cart.belongsTo(Transaction, { foreignKey: 'transaction_id' })

products.use(cors())
process.env.SECRET_KEY = 'secret'

products.post('/create_product', upload.array('files', 10), async (req, res) => {

    const productData = {
        product_name: req.body.name,
        product_brand: req.body.brand,
        product_description: req.body.description,
        product_price: req.body.price,
        product_quantity: req.body.quantity,
        sub_category_id: req.body.sub_category_selected
    }
    var image = []

    var find = await Product.findOne({
        where: { product_name: req.body.name }
    })
    if (!find) {
        var create = await Product.create(productData) 
        if (create.product_id) {
            for (let i = 0; i < req.files.length; i++) {
                image.push({
                    product_img_name: req.files[i].filename,
                    product_img_path: req.files[i].filename,
                    product_id: create.product_id
                })
            }
            ProductImage.bulkCreate(image)
            res.json({
                status: `${ create.product_name } product succesfully created`
            })
        }
    }
    else {
        res.json({ error: 'Product name already exist' })
    }
})

products.get('/recommended_products', (req, res) => {
    sequelize.query(
        `SELECT products.product_id             AS 'id',
                product_name                    AS 'name',
                product_price                   AS price,
                product_quantity                AS quantity,
                IFNULL(rating.rating, 0)        AS 'rating',
                IFNULL(rating.count, 0)         AS 'count',
                product_images.product_img_name AS 'path'
            FROM products
            LEFT JOIN  (
                SELECT product_id, 
                SUM(review_rating) AS 'rating',
                COUNT(review_rating) AS 'count'
                FROM reviews
                GROUP BY product_id
                ) rating
            ON products.product_id = rating.product_id
            JOIN product_images
            ON product_images.product_id = products.product_id
            GROUP BY products.product_id
            ORDER BY RAND()
            LIMIT 10
    `)
    .then( ( [ results, metadata ] ) => { res.json( { recommended: results } ) })
})

products.get('/products', (req, res) => {
    sequelize.query(
        `SELECT products.product_id           AS 'id',
                product_name                    AS 'name',
                product_price                   AS price,
                product_quantity                AS quantity,
                IFNULL(rating.rating, 0)        AS 'rating',
                IFNULL(rating.count, 0)         AS 'count',
                product_images.product_img_name AS 'path'
            FROM products
            LEFT JOIN  (
                SELECT product_id, 
                SUM(review_rating) AS 'rating',
                COUNT(review_rating) AS 'count'
                FROM reviews
                GROUP BY product_id
                ) rating
            ON products.product_id = rating.product_id
            JOIN product_images
            ON product_images.product_id = products.product_id
            
            GROUP BY products.product_id
    `)
    .then( ( [ results, metadata] ) => { res.json( { product: results } ) } )
})

// Product.findAll({
//   group: ['products.product_id'],
//   include:[{
//     model: Reviews,
//     required: false,
//     attributes: {  
//       include: [            
//         [sequelize.fn('COUNT', sequelize.col('reviews.review_rating')), 'count'],
//         [sequelize.fn('SUM', sequelize.col('reviews.review_rating')), 'rating']
//       ]
//     }
//   }
// })
// .then(product => {
//   const obj = product.map(product => {
//     return Object.assign({
//       product_id: product.product_id,
//       product_name: product.product_name,
//       product_brand: product.product_brand,
//       product_description: product.product_description,
//       product_price: product.product_price,
//       product_quantity: product.product_quantity,
//       product_images: product.product_images.map(image => {
//         return Object.assign({
//           product_img_name: image.product_img_name,
//           product_img_path: image.product_img_path,
//         })
//       }),
//       reviews: product.reviews.map(review => {
//         return Object.assign({
//           review_rating: review.review_rating
//         })
//       })
//     })
//   })
//   res.json({ product: product })
// })

products.post('/view_product', async (req, res) => {

    var product = await Product.findOne({
        where: { product_name: req.body.product_name },
        include: [ { model: ProductImage } ]
    })
    res.json({ product })
})

module.exports = products