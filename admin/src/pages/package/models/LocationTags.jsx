import {  Backdrop } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react";
import CropEasy from "../../../utils/crop/CropEasy";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";
import { MyContext } from "../../../context/Context";
import useDebounce from "../../../hooks/useDebounce"
import { CreatePackageLocation } from "../../../components/CreatePackageLocation";

export const LocationTags = ({locationTagsOpen, setLocationTagsOpen, pack, reFetch})=> {
    const {setNotificationMessage} = useContext(MyContext)
    const [updateLocationTagsLoading,setLocationTagsLoading] = useState(false)
    const [locationTags, setLocationTags] = useState([])
    const [locationSelectBoxOpen, setLocationSelectBoxOpen] = useState(false)
    const [locations, setLocations] = useState([])
    const [newLocations, setNewLocations] = useState([])

    const handleAddLocation = (location,img) => {
        const isLocationExists = newLocations.some(loc => loc.location === location);
      
        if (isLocationExists) {
          alert('Location already exists!');
        } else {
          setNewLocations(prev => [...prev, {location,img}]);
        }
      };



    useEffect(()=>{
        setLocationTags(pack.locationTags)
        console.log(pack.locationTags)
    },[pack])
    const handleOpenCreateLocation = (e) =>{
        e.preventDefault()
        setOpenCreateLocation(true)
    }

    const handleClose = () => {
        setLocationTagsOpen(false);
        setNewLocations([])
        document.getElementById("location-tags-form").reset();
        setLocationSelectBoxOpen(false)



      };
      const handleClickExistingLocation = (index) => {
        setLocationTags(locationTags.filter((item,ind)=>(ind !== index)))
      }

      const handleDeleteNewLocation = (index) => {
        setNewLocations(newLocations.filter((item,ind)=>(ind !== index)))
      }
     
      
      
      const handleSubmit = async (e) => {
        e.preventDefault()
        setLocationTagsLoading(true)
        try {
           const data = [
            ...locationTags, ...newLocations
           ]
           const res = await axiosInstance.patch(`/package/${pack._id}`, {locationTags:data})
           console.log(res)
            
              setLocationTagsLoading(false)
              setLocationTagsOpen(false)
              document.getElementById("location-tags-form").reset();
              setLocationSelectBoxOpen(false)

              reFetch()
              setNewLocations([])
              setNotificationMessage("Location Tags updated successfully")

            
            
        } catch (error) {
            alert(error)
            setLocationTagsLoading(false)
        }
      }




      const [search, setSearch] = useState(null)
      const debouncedSearch = useDebounce(search, 500)

      useEffect(() => {
        async function fetchData() {
            
            const data = await axiosInstance.get(`/packagelocations?location=${debouncedSearch}`)
                .then(res => {setLocations(res.data)
                   })
                .catch(err=> {console.log(err)
                    })

            
        }
        if (debouncedSearch) fetchData()

    },[debouncedSearch])
      
      const handleSetSearch = (e) => {
        if (e.target.value === '') {
            setLocations([])
            setLocationSelectBoxOpen(false);
          } else {
            setLocationSelectBoxOpen(true);
          }
        setSearch(e.target.value);
      };

      const [openCreateLocation, setOpenCreateLocation] =useState(false)
      const locationSelectBox = useRef(null);
      useEffect(() => {
        const handleOutsideClick = (event) => {
          
          if (locationSelectBox.current && !locationSelectBox.current.contains(event.target)) {
            // Click occurred outside the menu, hide the menu
            setLocationSelectBoxOpen(false);
           
           
          }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);
    return(
        <div>
      <Backdrop
        sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={locationTagsOpen}

      >
        <CreatePackageLocation  openCreateLocation={openCreateLocation} setOpenCreateLocation={setOpenCreateLocation} />
       
        <div className="bg-[white] flex flex-col w-[50%] p-4 rounded min-h-[700px] max-h-[700px] overflow-scroll no-scrollbar">
          <div className="flex justify-between packs-center border-b pb-4 border-[#e2e2e2]">
            <h1 className="text-xl font-bold">Location Tags</h1>
            <img
              src="/images/icons/Close.png"
              className="w-6 cursor-pointer"
              alt=""
              onClick={handleClose}
            />
          </div>

          <div>

            <div>
                <div className="px-4 py-12 flex flex-wrap  gap-8">
                {locationTags && locationTags?.map((item,index)=>(
                    <div className=" flex max-w-fit justify-between items-center mb-8 bg-bg text-[white] gap-12">
                    <div className="flex items-center gap-4">
                    <img src={item.img} alt=""  className="w-20"/>
                    <h1 className="font-medium text-base">{item.location}</h1>
                    </div>
                    <img src="/images/icons/Close.png" alt="" className="w-6 mr-2 cursor-pointer" onClick={()=>handleClickExistingLocation(index)} />
                </div>

                ))}
                {
                    newLocations && newLocations?.map((item, index)=>(
                        <div key={index} className=" flex max-w-fit mb-8 justify-between items-center bg-bg text-[white] gap-12">
                            <div className="flex items-center gap-4">
                            <img src={item.img} alt=""  className="w-20"/>
                            <h1 className="font-medium text-base">{item.location}</h1>
                            </div>
                            <img src="/images/icons/Close.png" alt="" className="w-6 mr-2 cursor-pointer" onClick={()=>handleDeleteNewLocation(index)}/>
                        </div>
                    ))
                }
                </div>

                {locationTags && newLocations && locationTags.length === 0 && newLocations.length === 0 && <div className="flex flex-col items-center gap-4 py-8">
                    <img src="/images/icons/notFound.png" alt="" className="w-20"/>
                    <h1 className="text-[grey]">No location Tags added</h1>
                </div>}
            </div>
          </div>

          <div className="px-4 py-8 grow flex flex-col">
            <form action="" id="location-tags-form" className="flex grow flex-col h-full justify-between">
                <div className="flex flex-col gap-4">
                    <label htmlFor="">Add Location Tags</label>
                   <div className="relative">
                   <input
                  className="bg-[#eeeeee] px-4 py-2 rounded w-full"
                  type="text"
                  onClick={()=> setLocationSelectBoxOpen(true)}
                  onChange={handleSetSearch}
                />
                {locationSelectBoxOpen && locations  &&  <div ref={locationSelectBox} className="absolute top-[100%]  py-2  left-0 right-0 min-h-[150px] max-h-[150px] overflow-auto shadow-xl">
                   <ul>
                    {locations && locations?.map((item, index)=>(
                        <li className="flex gap-4 items-center py-1 px-4 hover:bg-[#eaeaea] cursor-pointer" onClick={()=>handleAddLocation(item.location, item.img)}><img src={item.img} alt="" className="w-20"/>{item.location} </li>
                    ))}
                    {
                      locations.length == 0 && 
                      <li className="flex gap-4 items-center py-1 px-4 hover:bg-[#eaeaea] cursor-pointer" >No locations found! </li>


                    }
                    
                   </ul>
                </div>}
                   </div>
                    
                </div>

                <div>
                <button
                  className="bg-bg w-full mt-[200px] flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]" onClick={handleSubmit}
                >
                  Update Location Tags
                  {updateLocationTagsLoading && <ClipLoader color="white" size={24} />}
                </button>
                <div>
                    <button className="bg-bg mt-4 py-2 px-4 rounded text-[white]" onClick={handleOpenCreateLocation}> Add a new Location</button>
                </div>
                </div>
            </form>
          </div>
      



      
        </div>
      </Backdrop>
    </div>
    )
}