const express = require('express')
const subcategories = express.Router()
const cors = require('cors')

const SubCategory = require('../models/SubCategory')

subcategories.use(cors())

process.env.SECRET_KEY = 'secret'

subcategories.post('/createSubCategory', async (req, res) => {

    const subcategoryData = {
        sub_category_name: req.body.sub_category_name,
        category_id: req.body.category_id,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    var find = await SubCategory.findOne({
        where: {
            sub_category_name: req.body.sub_category_name,
            category_id: req.body.category_id
        }
    })
    if (!find) {
        var create = await create(subcategoryData)
        res.json({ status: `${ create.sub_category_name } sub category succesfully created` })
    }
    else {
        res.json({ error: 'Sub Category name already exist' })
    }
})

subcategories.post('/sub_category_dropdown', async (req, res) => {
    var find = await SubCategory.findAll({
        where: { category_id: req.body.category_id }
    })
    res.json(find.map(subcategory => {
        return Object.assign({}, {
            label: subcategory.sub_category_name,
            value: subcategory.sub_category_id
        })
    }))
})

module.exports = subcategories