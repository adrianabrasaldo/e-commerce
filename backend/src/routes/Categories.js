const express = require('express')
const categories = express.Router()
const cors = require('cors')

const Category = require('../models/Category')
const SubCategory = require('../models/SubCategory')

Category.hasMany(SubCategory, { foreignKey: 'category_id' })
SubCategory.belongsTo(Category, { foreignKey: 'category_id' })

categories.use(cors())

process.env.SECRET_KEY = 'secret'

categories.post('/createCategory', async (req, res) => {

    const categoryData = {
        category_name: req.body.category_name,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    var category = await Category.findOne({
        where: { category_name: req.body.category_name }
    })
    
    if (!category) {
        var createCategory = await Category.create(categoryData)
        res.json({ status: createCategory.category_name + ' category succesfully created!' })
    }
    else {
        res.json({ error: 'Category name already exist' })
    }
})

categories.get('/categories', async (req, res) => {
    var category = await Category.findAll({
        include: [{ model: SubCategory }]
    })
    res.json(category.map(category => {
        return Object.assign({
            label: category.category_name,
            children: category.sub_categories.map(sub_category => {
                return Object.assign({ label: sub_category.sub_category_name })
            })
        })
    }))
})

categories.get('/category_dropdown', (req, res) => {
    var category = await Category.findAll({ include: [{ model: SubCategory }] })

    res.json(category.map(category => {
        return Object.assign({}, {
            label: category.category_name,
            value: category.category_id,
        })
    }))
})

categories.post('/updateCategory', async (req, res) => {
    
    var value = { category_name: req.body.new_category }
    var selector = { where: { category_name: req.body.old_category } };
    var category = await Category.update(value, selector)

    if (category) res.json({ status: `${ req.body.old_category } Category succesfully updated to ${ req.body.new_category }`})
})

module.exports = categories