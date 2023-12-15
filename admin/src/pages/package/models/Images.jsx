import { Backdrop } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import CropEasy from "../../../utils/crop/CropEasy";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";
import { MyContext } from "../../../context/Context";

export const Images = ({imagesOpen, setImagesOpen, pack, reFetch})=> {
    const {setNotificationMessage} = useContext(MyContext)
    const [updateImagesLoading,setUpdateImagesLoading] = useState(false)
    const [imgFiles, setImgFiles] = useState([]);

    const handleClose = () => {
        setImagesOpen(false);
        setImgFiles([])
      };
      const [images, setImages] = useState([])
      useEffect(()=>{
        setImages(pack.images)
      },[pack, imagesOpen])

      const handleDeleteImageExisting = (index) => {
        setImages(images.filter((item,ind)=>(ind !== index)))

      }
      const handleDeleteImageNew = (index)=> {
        setImgFiles(imgFiles.filter((item,ind)=>ind !== index))
      }
      const [file, setFile] = useState("");

      const [photoURL, setPhotoURL] = useState("");
      const [openCrop, setOpenCrop] = useState(false);
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setFile(file);
          setPhotoURL(URL.createObjectURL(file));
          setOpenCrop(true);
          // console.log(imgFiles)
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(images)
        setUpdateImagesLoading(true)
        try {
            const list = await Promise.all(
                Object.values(imgFiles).map(async (file) => {
                  const data = new FormData();
                  data.append("file", file);
                  data.append("upload_preset", "upload");
                  const uploadRes = await axiosInstance.post(
                    "https://api.cloudinary.com/v1_1/difxlqrlc/image/upload",
                    data
                  );
        
                  const url = uploadRes.data.url;
                  return url;
                })
              );

              const data = {
                images:[...images, ...list ]
              }

              const res = await axiosInstance.patch(`/package/${pack._id}`, data)
                setUpdateImagesLoading(false)
                setImgFiles([])
                setNotificationMessage("Images updated successfully")
                setImagesOpen(false)
                reFetch()
            
        } catch (error) {
            alert(error)
            setUpdateImagesLoading(false)
        }
      }
      

    return(
        <div>
      <Backdrop
        sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={imagesOpen}

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
              }}
            />
          </div>
        )}
        <div className="bg-[white] w-[50%] p-4 rounded max-h-[700px] overflow-scroll no-scrollbar">
          <div className="flex justify-between packs-center border-b pb-4 border-[#e2e2e2]">
            <h1 className="text-xl font-bold">Images</h1>
            <img
              src="/images/icons/Close.png"
              className="w-6 cursor-pointer"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="py-8 px-4">
                <div className="flex flex-wrap gap-[5%]">
                    {images && images.map((item,index)=>(
                        <div className="w-[30%] relative mb-8"  key={index}>
                            <img src={item} alt="" />
                            <div className="absolute top-0 right-0 translate-x-[50%] translate-y-[-50%]">
                                <img src="/images/icons/Close.png" alt="" className="w-6 bg-[#000000] cursor-pointer rounded-full shadow-2xl p-1" onClick={()=>handleDeleteImageExisting(index)}/>
                            </div>
                        </div>
                    ))}
                    {imgFiles &&
                Object.values(imgFiles).map((pic, index) => (
                 <div className="w-[30%] mb-8 relative">
                     <img
                    className="w-full"
                    src={
                      pic
                        ? URL.createObjectURL(pic)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                  <div className="absolute top-0 right-0 translate-x-[50%] translate-y-[-50%]">
                                <img src="/images/icons/Close.png" alt="" className="w-6 bg-[#000000] cursor-pointer rounded-full shadow-2xl p-1" onClick={()=>handleDeleteImageNew(index)}/>
                            </div>
                 </div>
                ))}
                </div>
          </div>



          <div className="px-4 py-8">
                <form action="">
                    <div >
                        <label className="flex items-center gap-2 cursor-pointer" htmlFor="imgs-upload"><img src="/images/icons/upload.png" className="w-8" alt="" /> Upload Image </label>
                    <input type="file" className="hidden" id="imgs-upload" onChange={handleImageChange}/>

                    </div>

                    <div className="flex mt-12">
                <button
                  className="bg-bg w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Update Images{" "}
                  {updateImagesLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>
                </form>
          </div>
        </div>
      </Backdrop>
    </div>
    )
}