const express = require('express')
const categories = express.Router()
const cors = require('cors')

const Category = require('../models/Category')
const SubCategory = require('../models/SubCategory')

Category.hasMany(SubCategory, { foreignKey: 'category_id'})
SubCategory.belongsTo(Category, { foreignKey: 'category_id'})

categories.use(cors())

process.env.SECRET_KEY = 'secret'

categories.post('/createCategory', (req, res) => {
  const today = new Date();
  const categoryData = {
    category_name: req.body.category_name,
    createdAt: today,
    updatedAt: today
  }
  Category.findOne({
    where: {
      category_name: req.body.category_name
    }
  })
  .then(category => {
    if (!category) {
      Category.create(categoryData)
      .then(category => {
        res.json({ 
          status: category.category_name + ' category succesfully created!'
        })
      })
      .catch(err => {
        res.send('Register failed: ' + err)
      })
    }
    else {
      res.json({ error: 'Category name already exist'})
    }
  })
  .catch(err => {    
    res.json({ 
      error: 'Searching category name failed: ' + err
    })
  })
})

categories.get('/categories', (req, res) => {
  Category.findAll({
    include: [{
      model: SubCategory 
    }]
  })
  .then(category => {
    const obj = category.map(category => {
      return Object.assign({
        label: category.category_name,
        children: category.sub_categories.map(sub_category => {
          return Object.assign({
            label: sub_category.sub_category_name
          })
        })      
      })
    });
    res.json(obj)
  })
})

categories.get('/category_dropdown', (req, res) => {
  Category.findAll({
    include: [{
      model: SubCategory 
    }]
  })
  .then(category => {
    const obj = category.map(category => {
      return Object.assign({}, {
        label: category.category_name,
        value: category.category_id,
      })
    });
    res.json(obj)
  })
  .catch(err => {
    res.json({ 
      status: 'Searching category drop down failed: ' + err
    })
  })
})

categories.post('/updateCategory', (req, res) => {
  Category.findOne({ 
    where: { 
      category_name: req.body.old_category 
    } 
  })
  .then(category => {
    if (category) {
      category.update({
        category_name: req.body.new_category
      })
      .then(() => {
        res.json({ 
          status: '"'+ req.body.old_category  +'"' 
                + ' Category succesfully updated to ' 
                + '"'+ req.body.new_category  +'"'
        })
      })
    }
    else {      
      res.json({ 
        status: req.body.old_category + ' category not found'
      })
    }
  })
  .catch(err => {
    res.json({ error: 'Updating category failed: ' + err
    })
  })
})

module.exports = categories