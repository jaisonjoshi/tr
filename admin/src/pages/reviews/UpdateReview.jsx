import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ClipLoader from "react-spinners/ClipLoader";

import CropEasy from "../../utils/crop/CropEasy";
import axiosInstance from "../../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../context/Context";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const UpdateReview = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[3];
  const {data, loading:reviewLoading,error} = useFetch(`/reviews/${id}`);
  const {setNotificationMessage} = useContext(MyContext)
  const navigate = useNavigate()
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const [imgFiles, setImgFiles] = useState([]);
  const [cropCompleted, setCropCompleted] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
      // console.log(imgFiles)
    }
  };
  const size = 1/1;

  const [info, setinfo] = useState({});
  useEffect(()=>{
    setinfo(data)
  }, [data])

  const handleChange = (e) => {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


      try {
        setLoading(true);

        let url =info.image;
        if (file != "") {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/difxlqrlc/image/upload",
            data
          );

          info.image = uploadRes.data.url;
        }
        const newReview = {
          ...info,
          
         
        };
        const res = await axiosInstance.patch(`/reviews/${id}`, newReview);
        console.log(res);
        setLoading(false)
        navigate('/reviews')
        setNotificationMessage("Review Updated successfully. ")

      } catch (error) {}
   
  };

  return (
    <div>
      <div className="  ">
        <Navbar />
        <div className=" flex mt-[70px] h-full w-full">
          <Sidebar />
          <div className="px-8 grow flex ml-[300px] flex-col">
            {openCrop && (
              <div className="absolute top-[50%] z-[10000] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-2xl">
                <CropEasy
                  {...{
                    photoURL,
                    setOpenCrop,
                    setPhotoURL,
                    setFile,
                    imgFiles,
                    setImgFiles,
                    size,
                    setCropCompleted,
                  }}
                />
              </div>
            )}

            <div className="sticky top-[70px] pb-8 pt-8 bg-[white]">
              <h1 className="text-3xl  font-bold">Update Review</h1>
              
            </div>
            {reviewLoading ?

            <div className="flex justify-center mt-40"><ClipLoader /></div>
            
            
            :<div className="flex sticky top-0 overflow-auto no-scrollbar">
              <div className="w-[50%]">
                <form action="" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4 mb-8">
                    <label htmlFor="">Review Text</label>
                    <textarea
                      className="w-full bg-[#ebebeb] px-4 py-2 rounded"
                      onChange={handleChange}
                      id="reviewnote"
                      defaultValue={info.reviewnote}
                    />
                  </div>
                  <div className="flex flex-col gap-4 mb-8">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      className="w-full bg-[#ebebeb] px-4 py-2 rounded"
                      onChange={handleChange}
                      id="author"
                      defaultValue={info.author}

                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label htmlFor="">Place</label>
                    <input
                      type="text"
                      className="w-full bg-[#ebebeb] px-4 py-2 rounded"
                      onChange={handleChange}
                      id="place"
                      defaultValue={info.place}

                    />
                  </div>
                  <div className="mt-8">
                    <div className="flex gap-2 items-center">
                      <span>Upload image</span>
                      <label htmlFor="img-input">
                        <img
                          src="/images/icons/upload.png"
                          className="w-6"
                          alt=""
                        />
                      </label>
                      <input
                        type="file"
                        name=""
                        className="hidden"
                        id="img-input"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  <div className="mt-12 flex  items-center gap-6">
                    <button
                      className="bg-bg px-4 py-2 rounded text-[white] shadow-2xl"
                      onClick={handleSubmit}
                    >
                      Update Review
                    </button>{" "}
                    {loading && <ClipLoader color="#101A33" />}
                  </div>
                  
                </form>
              </div>
              <div className="w-[50%] px-8 relative">
                <div className="px-4 py-8 shadow-xl min-h-[200px]">
                  <div>
                    {info && (
                      <div>
                        <h1 className="font-medium text-2xl">
                          Image
                        </h1>
                      </div>
                    )}
                  </div>
                  <div className="">
                    <img
                      className="my-8 w-[30%]"
                      src={
                        !cropCompleted
                          ? info.image
                          : file
                          ? URL.createObjectURL(file)
                          : "/images/noImg.jpg"
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateReview;
