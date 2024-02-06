import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../utils/axiosInstance";
import { MyContext } from "../../context/Context";

const PopularPlaces = () => {
  const navigate = useNavigate()
  const {setNotificationMessage} = useContext(MyContext)

  const [info, setInfo] = useState(null)

  const [popularPlaces, setPopularPlaces] = useState([])
  const {data, loading, error, reFetch} = useFetch('/popularplaces');
  const {data:locations, loading:locationLoading} = useFetch('/packagelocations')
  const [deleteLoading, setDeleteLoading] =useState(false)
    useEffect(()=>{
      setPopularPlaces(data)
       
    },[data])
  const handleLocationChange = (e) => {
    const selectedLocationObj = locations.find(item => item.location === e.target.value);
    setInfo(selectedLocationObj)
    console.log(info)

  }

  const addPopularPlace =  async () => {
    try {

      const popularPlace = {
        name: info.location,
        image:info.img
      }
      await axiosInstance.post('/popularplaces', popularPlace);
      console.log("success")
      reFetch();
      setNotificationMessage("Place added to the List")
  
      
    } catch (error) {
      console.log(error)
    }

  }

  const deletePlace = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this place from the List?")
    if(confirm){
        try {
          await axiosInstance.delete(`/popularplaces/${id}`)
          reFetch();
          setNotificationMessage("Place deleted from the List")

          
        } catch (error) {
          alert("Something happened. Try again later.")
        }
    }
  }

  return (
    <div>
      <div className="  ">
        <Navbar />
        <div className=" flex mt-[70px] h-full w-full">
          <Sidebar />
          <div className="px-8 grow flex ml-[300px] flex-col">
            <h1 className="text-2xl my-12 font-bold">Popular places List</h1>

            <div className="px-8 py-4 border border-bg rounded flex flex-col items-start gap-8">
              <h1 className="text-lg">Add a place to the list</h1>
              <select name="popularplace" id="popularplace" className="bg-[#eeeeee] px-4 py-4 rounded w-full" onChange={handleLocationChange}>
                {!locationLoading && locations && locations?.map((item, index)=>(
                  <option value={item.location} key={index}>{item.location}</option>
                ))}
              </select>
              <button className="bg-bg px-2 py-1 rounded text-[white]" onClick={addPopularPlace}>Add this place to the list</button>
            </div>
           {
            loading ?
              <div className="flex justify-center mt-40"><ClipLoader /></div>
           :
          (           <div className="flex gap-[3.33%] flex-wrap mt-8 ">
          {popularPlaces && popularPlaces?.map((item, index)=>(
              <div className="w-[30%] rounded overflow-hidden  relative" key={index} >
                  <img src={item.image} className="w-full"/>
                  <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-[#2626269e]"></div>
                  <img src="images/icons/Close.png" onClick={()=>deletePlace(item._id)} className=" w-8 cursor-pointer absolute top-2 right-2 z-[1000000000000]" alt="" />
                  <h1 className="absolute text-[white] font-bold text-2xl bottom-2 left-[50%] translate-x-[-50%]">{item.name}</h1>

              </div>
          ))}
          
          
          {popularPlaces  && popularPlaces.length === 0 &&  <div className="flex flex-col w-full items-center gap-4 py-8">
                    <img src="/images/icons/notFound.png" alt="" className="w-20"/>
                    <h1 className="text-[grey]">No places added</h1>
                </div>}
          
          
          </div>)}
           
           

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularPlaces;
