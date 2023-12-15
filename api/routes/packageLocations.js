const express = require('express')
const router = express.Router()
const {createPackageLocation, getPackageLocations} = require('../controllers/PackageLocationsController')


router.post('/', createPackageLocation)
router.get('/',getPackageLocations)

module.exports = router