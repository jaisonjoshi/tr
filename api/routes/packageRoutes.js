const express = require('express')
const router = express.Router()
const {createPackage, getPackages,getSimplifiedPackages, getPackage,updatePackage} = require('../controllers/PackageController')


router.post('/new', createPackage)
router.get('/',getPackages)
router.get('/packagetitles', getSimplifiedPackages)
router.get('/:id',getPackage)
router.patch('/:id',updatePackage)

module.exports = router