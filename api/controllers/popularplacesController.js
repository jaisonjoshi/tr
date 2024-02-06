const PopularPlaces = require('../models/PopularPlaces')

const getPopularPlaces = async (req,res) => {
    try {
        

        const popularplaces = await PopularPlaces.find();
        res.status(200).json(popularplaces)
        
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });

    }
}

const createPopularPlaces = async(req,res) => {
    
   try {
    const popularplace = await PopularPlaces.findOne({name :req.body.name});
    if(popularplace){
        console.log('already existing')
    }
    else{
       await PopularPlaces.create(req.body)
       res.status(200).json("success")
    }
   } catch (error) {
    console.log(error)
   }
}


const deletePopularPlace = async (req, res) => {
    const {id} = req.params;
    try {
        const popularplace = await PopularPlaces.findOne({_id:id});
        if(!popularplace){
            console.log('Place not found')
        }
        else{
            await PopularPlaces.findOneAndDelete({_id:id})
            res.status(200).json("success")
         }
        
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = {getPopularPlaces, createPopularPlaces, deletePopularPlace}