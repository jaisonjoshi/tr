import { useContext, useState } from "react"
import axiosInstance from "../utils/axiosInstance"
import { MyContext } from "../context/Context"
import CropEasy from "../utils/crop/CropEasy"
import ClipLoader from "react-spinners/ClipLoader"
import axios from "axios"


export const CreatePackageLocation = ({setOpenCreateLocation, openCreateLocation}) => {
    const [location, setLocation] = useState("")
    const [newLocationLoading, setNewLocationLoading] = useState(false)
    const {setNotificationMessage} = useContext(MyContext)
    const handleChange = (e) => {
        setLocation(e.target.value)
        console.log(location)
    }
    const [photoURL, setPhotoURL] = useState("");
    const [openCrop, setOpenCrop] = useState(false);
    const [file, setFile] = useState("");
    const [imgFiles, setImgFiles] = useState([]);
    const [cropCompleted, setCropCompleted] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log("hello")
        if (file) {
          setFile(file);
          setPhotoURL(URL.createObjectURL(file));
          setOpenCrop(true);
          // console.log(imgFiles)
        }
      };
    const handleSubmit = async (e) => {
        e.preventDefault()
        setNewLocationLoading(true)
        try {
            let url =
          "https://res.cloudinary.com/difxlqrlc/image/upload/v1702213948/site/lwxn98cm18bncsmq89nr.jpg";
        if (file != "") {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/difxlqrlc/image/upload",
            data
          );

          url = uploadRes.data.url;

          const loc = {
            location:location.toLowerCase(),
            img:url

          }
          const res= await axiosInstance.post('/packagelocations', loc)
          setOpenCreateLocation(false)
          setNotificationMessage("New location added successfully")
     

        }
            
        } catch (error) {
            alert(error)
        }

    }

    return(
        <div className={`fixed z-[100]  bg-[#0000008a] ${openCreateLocation ? "" : "hidden"}   w-full h-[100vh]`}>
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
                size:16/9,
                setCropCompleted
              }}
            />
          </div>
        )}
            <div className="bg-[white] relative top-[50%] translate-y-[-50%] w-[40%]  left-[50%] translate-x-[-50%] rounded px-4 py-4">
                <div className="flex justify-between">
                <h1 className="text-2xl font-medium">Add a new Loaction</h1>
                <img src="/images/icons/Close.png" alt="" className="w-8 cursor-pointer" onClick={()=>setOpenCreateLocation(false)}/>
                </div>
                <div>
                    <form action=" " onSubmit={handleSubmit}>
                        <div className="flex flex-col mt-12 gap-2 w-full">
                            <label htmlFor="" className="text-lg">Location</label>
                            <input id="location"  onChange={handleChange} type="text" className="bg-[#f2f2f2] py-3 px-4 rounded"/>
                        </div>
                        <div className="my-8">
                        <label className="flex items-center gap-2 cursor-pointer" htmlFor="location-img-upload"><img src="/images/icons/upload.png" className="w-8" alt="" /> Upload Image </label>
                    <input type="file" className="hidden" id="location-img-upload" onChange={handleImageChange}/>

                    </div>
                    <div>
                       
                        <div className="w-[30%]">
                        <img
                      className="my-8 w-full"
                      src={
                        !cropCompleted
                          ? "/images/noImg.jpg"
                          : file
                          ? URL.createObjectURL(file)
                          : "/images/noImg.jpg"
                      }
                      alt=""
                    />
                      </div>
                        
                    </div>
                        <div>
                        <button
                  className="bg-bg w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Upload Location{" "}
                  {newLocationLoading && <ClipLoader color="white" size={24} />}
                </button>                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}