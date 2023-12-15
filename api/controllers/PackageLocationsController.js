const PackageLocations = require('../models/PackageLocations')

const getPackageLocations = async (req,res) => {
    try {
        const searchText =  req.query.location;

        const locations = await PackageLocations.find({location: new RegExp(searchText, 'i')}).exec();
        res.status(200).json(locations)
        
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });

    }
}

const createPackageLocation = async(req,res) => {
    const {location} = req.body
   try {
    const packageLocation = await PackageLocations.findOne({location :location});
    if(packageLocation){
        console.log('already existing')
    }
    else{
       const loc = await PackageLocations.create(req.body)
       res.status(200).json("success")
    }
   } catch (error) {
    console.log(error)
   }
}

module.exports = {createPackageLocation, getPackageLocations}