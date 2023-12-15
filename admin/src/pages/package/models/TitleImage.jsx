import { Backdrop } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import CropEasy from "../../../utils/crop/CropEasy";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";
import { MyContext } from "../../../context/Context";

export const TitleImage = ({titleImageOpen, setTitleImageOpen, pack, reFetch})=> {
    const {setNotificationMessage} = useContext(MyContext)
    const [updateTitleImageLoading,setUpdateTitleImageLoading] = useState(false)
    const [imgFiles, setImgFiles] = useState([]);
    const [cropCompleted, setCropCompleted] = useState(false);

    const handleClose = () => {
        setTitleImageOpen(false);
        setImgFiles([])
      };

      const [photoURL, setPhotoURL] = useState("");
      const [openCrop, setOpenCrop] = useState(false);
      const [file, setFile] = useState("");

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
        setUpdateTitleImageLoading(true)
        try {
            let url =
          "";
        if (file != "") {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          const uploadRes = await axiosInstance.post(
            "https://api.cloudinary.com/v1_1/difxlqrlc/image/upload",
            data
          );

          url = uploadRes.data.url;
        }

              const data = {
                titleImage:url
              }
              const res = await axiosInstance.patch(`/package/${pack._id}`, data);
              setUpdateTitleImageLoading(false)
              setTitleImageOpen(false)
              reFetch()
              setNotificationMessage("Title image updated successfully")

            
            
        } catch (error) {
            alert(error)
            setUpdateTitleImageLoading(false)
        }
      }
     
      

    return(
        <div>
      <Backdrop
        sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={titleImageOpen}

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
                size:16/9,
                setCropCompleted
              }}
            />
          </div>
        )}
        <div className="bg-[white] w-[50%] p-4 rounded max-h-[700px] overflow-scroll no-scrollbar">
          <div className="flex justify-between packs-center border-b pb-4 border-[#e2e2e2]">
            <h1 className="text-xl font-bold">Title Image</h1>
            <img
              src="/images/icons/Close.png"
              className="w-6 cursor-pointer"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="py-8 px-4">
               <div className="w-[50%] mx-auto">
               <img
                      className="my-8 w-full"
                      src={
                        !cropCompleted
                          ? pack.titleImage 
                          : file
                          ? URL.createObjectURL(file)
                          : pack.titleImage 
                      }
                      alt=""
                    />               </div>
          </div>



          <div className="px-4 py-8">
                <form action="">
                    <div >
                        <label className="flex items-center gap-2 cursor-pointer" htmlFor="title-img-upload"><img src="/images/icons/upload.png" className="w-8" alt="" /> Upload Image </label>
                    <input type="file" className="hidden" id="title-img-upload" onChange={handleImageChange}/>

                    </div>

                    <div className="flex mt-12">
                <button
                  className="bg-bg w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Update Title Image{" "}
                  {updateTitleImageLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>
                </form>
          </div>
        </div>
      </Backdrop>
    </div>
    )
}