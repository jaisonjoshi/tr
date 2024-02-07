const PackageLocations = require('../models/PackageLocations')

const getPackageLocations = async (req,res) => {
    try {
        const searchText =  req.query.location;

        const locations = await PackageLocations.find({location: new RegExp(searchText, 'i')}).select('location img').exec();
        res.status(200).json(locations)
        console.log(locations)
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });

    }
}

const getPackageLocation = async (req,res) => {
    try {
        const {destination} =  req.params;

        const location = await PackageLocations.findOne({location: destination});
        res.status(200).json(location)
        console.log(location)
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
        res.status(409).json({message: "Already existing!"})
    }
    else{
       const loc = await PackageLocations.create(req.body)
       res.status(200).json("success")
    }
   } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
   }
}

module.exports = {createPackageLocation, getPackageLocations, getPackageLocation}