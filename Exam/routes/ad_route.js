const ad_route = require('express').Router()
const path = require('path')
const ads = require('../models/ads')
const users = require('../models/user')
const {v4: uuid} = require('uuid')

// получить список всех товаров
ad_route.get('/', async (req, res) => {
    const adCollection = await ads.find().select('-__v')
    res.render(path.join(__dirname, '..', '/views/ads/main.ejs'), {
        adShelve: adCollection
    })
})

ad_route.get('/add', (req, res) => {
    res.render(path.join(__dirname, '..', '/views/ads/create.ejs'))
})
ad_route.post('/add', async (req, res) => {
    const {_id} = users
    const {shortText, desc, images, tags} = req.body
    const userId = _id
    const id = uuid()

    const newAd = await ads({
        _id: id,
        shortText: shortText,
        description: desc,
        images: images,
        userId: userId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        tags: tags,
        isDeleted: false
    })

    try {
        newAd.save()
        res.redirect('/')
    } catch (error) {
        console.error(error)
    }
})

module.exports = ad_route