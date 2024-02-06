const express = require('express')
const router = express.Router()
const {getPopularPlaces, createPopularPlaces, deletePopularPlace} = require('../controllers/popularplacesController')




router.get('/', getPopularPlaces)
router.post('/', createPopularPlaces)
router.delete('/:id', deletePopularPlace)

module.exports = router