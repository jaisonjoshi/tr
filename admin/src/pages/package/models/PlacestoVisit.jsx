import { useContext, useEffect, useState } from "react"
import { MyContext } from "../../../context/Context"
import Backdrop from "@mui/material/Backdrop";
import CropEasy from "../../../utils/crop/CropEasy";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";
import axios from "axios";


export const PlacesToVisit = ({placesToVisitOpen, setPlacesToVisitOpen, pack, reFetch}) => {
    const {setNotificationMessage} = useContext(MyContext)
    const [openAddPlace, setOpenAddPlace] = useState(false)
    const [placeLoading, setPlaceLoading] = useState(false);
    const [newPlaceLoading, setNewPlaceLoading] = useState(false)
    

      const [info, setinfo] = useState({});
      const handleChange = (e) => {
        setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(info);
      };
      const handleClose = () => {
        setPlacesToVisitOpen(false);
        setinfo({})
        setOpenAddPlace(false)
        document.getElementById('new-place').reset()

      };

      const [imgFiles, setImgFiles] = useState([]);
      const [cropCompleted, setCropCompleted] = useState(false);

      const [photoURL, setPhotoURL] = useState("");
      const [openCrop, setOpenCrop] = useState(false);
      const [file, setFile] = useState(null);
      

    const [existingPlaces, setExistingPlaces] = useState([])
      useEffect(()=>{
        setExistingPlaces(pack.places)
      },[pack,placesToVisitOpen])

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setFile(file);
          
          setPhotoURL(URL.createObjectURL(file));
          setOpenCrop(true);
          // console.log(imgFiles)
        }
      };
     


      const handleAddNewPlace=  async (e) => {
        e.preventDefault()
        console.log(info)

        if(!info.place || info.place.trim() === ""  || file === null){
          alert("Please enter all place fields")
        }
        else{
          setNewPlaceLoading(true)
          let confirmation = window.confirm("Are you sure to upload this Place?")
         if(confirmation){
          console.log(info)
          let url =
          "";
        if (file != "") {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/difxlqrlc/image/upload",
            data
          );

          url = uploadRes.data.url;
        }
        const newPlace = [
          ...existingPlaces, {...info, img:url}
        ]
          await axiosInstance.patch(`/package/${pack._id}`, {places:newPlace})
          setOpenAddPlace(false)
          setNewPlaceLoading(false)
          reFetch()
          setNotificationMessage("Uploaded place successfully")
          setinfo({})
          document.getElementById('new-place').reset()
          setFile(null)
         }
        }
        
      }

      const handleAddPlace = (e) => {
        e.preventDefault()
        setOpenAddPlace(true)

      }
     
      const makeExistingPlaceDelete = (index) => {
        setExistingPlaces(existingPlaces.filter((item,ind)=>(ind !== index)))

      }
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        setPlaceLoading(true)
        try {
          await axiosInstance.patch(`/package/${pack._id}`, {places:existingPlaces})
          setPlaceLoading(false)
          reFetch()
          setPlacesToVisitOpen(false)
          setNotificationMessage("Updated Activities")
          
        } catch (error) {
          
        }


      }


      





    return(
        <div>
             <Backdrop
        sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={placesToVisitOpen}
      >


{openCrop && (
          <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[100000] bg-[white] shadow-xl">
            <CropEasy
              {...{
                photoURL,
                setOpenCrop,
                setPhotoURL,
                setFile,
                imgFiles,
                setImgFiles,
                size:1,
                setCropCompleted
              }}
            />
          </div>
        )}


        <div className="bg-[white] w-[50%] p-4 rounded max-h-[700px] overflow-scroll no-scrollbar">
          <div className="flex justify-between packs-center border-b pb-4 border-[#e2e2e2]">
            <h1 className="text-xl font-bold">Places to Visit</h1>
            <img
              src="/images/icons/Close.png"
              className="w-6 cursor-pointer"
              alt=""
              onClick={handleClose}
            />
          </div>

          <div>
          {
              existingPlaces && existingPlaces?.map((item, index)=>(
                <div key={index} className="relative flex justify-between items-center border bg-[#e2e2e2] border-[#e2e2e2] my-8 px-4 py-4">
                            <div className="absolute top-2 right-2 flex items-center gap-4">
                        <img src="/images/icons/trash.png" alt="" className="w-5 cursor-pointer" onClick={()=>makeExistingPlaceDelete(index)} />

                    </div>
                                      <div className="w-[15%]">
               <img
                      className=" w-full"
                      src={item.img}
                      alt=""
                    />               </div>



                    <div className="w-[80%]">
                        <h1 className="font-bold text-xl">{item.place  }</h1>
                    </div>
                </div>
              ))
            }
          
            

          {existingPlaces  && existingPlaces.length === 0 &&  <div className="flex flex-col items-center gap-4 py-8">
                    <img src="/images/icons/notFound.png" alt="" className="w-20"/>
                    <h1 className="text-[grey]">No Places added</h1>
                </div>}

          </div>



          <div>

            <div className="my-4">
              <button className="bg-bg text-[white] px-4 py-2 rounded" onClick={handleAddPlace}>Add new place</button>
            </div>

            <div className={`border border-[#cbcbcb] px-4 overflow-hidden rounded ${openAddPlace ? "max-h-[1000px]" : "max-h-[0px]" } transition-all duration-300`}>
              <form action="" id="new-place" className="py-4">
                  <div >
                        <label className="flex items-center gap-2 cursor-pointer" htmlFor="place-upload"><img src="/images/icons/upload.png" className="w-8" alt="" /> Upload Image </label>
                    <input type="file" className="hidden" id="place-upload" onChange={handleImageChange}/>

                    </div>

                    <div className="flex flex-col gap-4 mt-8">
                <label htmlFor="">Place Title</label>
                <input
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="place"
                  name=""
                  onChange={handleChange}
                />
              </div>



            






                    <div className="flex justify-between items-center border border-[#e2e2e2] my-8 px-4 py-4">

                    <div className="w-[15%]">
               <img
                      className=" w-full"
                      src={
                        cropCompleted
                          && 
                           file &&
                          URL.createObjectURL(file)
                      }
                      alt=""
                    />               </div>



                    <div className="w-[80%]">
                        <h1 className="font-bold text-xl">{info.place ? info.place : "Place Title" }</h1>
                    </div>




                    </div>



                      <div className="flex items-center gap-4">
                        <button className="bg-bg px-4 py-2 text-[white] rounded flex gap-2 items-center" onClick={handleAddNewPlace}>Add place{newPlaceLoading && <ClipLoader color="white" size={18} />}</button>
                      </div>

              </form>
            </div>

            <button
                  className="bg-bg mt-8 w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]" onClick={handleSubmit}
                >
                  Update Places
                  {placeLoading && <ClipLoader color="white" size={24} />}
                </button>
          </div>
          
        </div>
      </Backdrop>
        </div>
    )
}