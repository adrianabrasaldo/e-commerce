const express = require('express')
const subcategories = express.Router()
const cors = require('cors')

const SubCategory = require('../models/SubCategory')

subcategories.use(cors())

process.env.SECRET_KEY = 'secret'

subcategories.post('/createSubCategory', (req, res) => {
  const today = new Date();
  const subcategoryData = {
    sub_category_name: req.body.sub_category_name,
    category_id: req.body.category_id,
    createdAt: today,
    updatedAt: today
  }
  SubCategory.findOne({
    where: {
      sub_category_name: req.body.sub_category_name,
      category_id: req.body.category_id
    }
  })
  .then(subcategory => {
    if(!subcategory) {
      SubCategory.create(subcategoryData)
      .then(subcategory => {
        res.json({ 
          status: subcategory.sub_category_name + ' sub category succesfully created!'
        })
      })
    }
    else {
      res.json({ error: 'Sub Category name already exist'})
    }
  })
  .catch(err => {    
    res.send('Creating new sub category name error: ' + err)
  })
})

subcategories.post('/sub_category_dropdown', (req, res) => {
  SubCategory.findAll({
    where: {
      category_id: req.body.category_id
    }
  })
  .then(subcategory => {
    const obj = subcategory.map(subcategory => {
      return Object.assign({},{
        label: subcategory.sub_category_name,
        value: subcategory.sub_category_id
      })
    })
    res.json(obj)
  })
})

module.exports = subcategories