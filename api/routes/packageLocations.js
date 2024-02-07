const express = require('express')
const router = express.Router()
const {createPackageLocation, getPackageLocations,getPackageLocation } = require('../controllers/PackageLocationsController')


router.post('/', createPackageLocation)
router.get('/',getPackageLocations)
router.get('/:destination',getPackageLocation)

module.exports = router