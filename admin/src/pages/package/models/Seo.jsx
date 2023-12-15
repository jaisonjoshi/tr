import Backdrop from "@mui/material/Backdrop";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import axiosInstance from "../../../utils/axiosInstance";
import ClipLoader from "react-spinners/ClipLoader";
import { MyContext } from "../../../context/Context";

export const Seo = ({
  seoOpen,
  setSeoOpen,
  pack,
  reFetch,
}) => {
    const {setNotificationMessage} = useContext(MyContext)


  const [info, setinfo] = useState({title:"", description:"",keywords:""});
  useEffect(()=>{
    setinfo(pack.seo)
    console.log(info)
  }, [pack, seoOpen])
  const [updateSeoLoading, setUpdateSeoLoading] = useState(false);
    
  const handleChange = (e) => {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };


  const handleClose = () => {
    document.getElementById("seo").reset();
    setSeoOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSeoLoading(true);
    try {
      const updatedSeo = {
        ...info,
      };
      const res = await axiosInstance.patch(
        `/package/${pack._id}`,
        updatedSeo
      );
      setUpdateSeoLoading(false);
      setSeoOpen(false);
      document.getElementById("seo").reset();

      setNotificationMessage("Updated SEO details successfully.")
      reFetch();
    } catch (error) {
      alert(
        "Something happened. Please try again or contact service provider."
      );
      setUpdateSeoLoading(false);
    }
  };
  return (
    <div>
      <Backdrop
        sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={seoOpen}
      >
        <div className="bg-[white] w-[50%] p-4 rounded max-h-[700px] overflow-scroll no-scrollbar">
          <div className="flex justify-between packs-center border-b pb-4 border-[#e2e2e2]">
            <h1 className="text-xl font-bold">SEO Tags</h1>
            <img
              src="/images/icons/Close.png"
              className="w-6 cursor-pointer"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="py-8 px-4">
            <form
              action=""
              id="seo"
              className="text-[#414141] flex flex-col gap-8"
            >
              <div className="flex flex-col gap-4">
                <label htmlFor="">Site Title</label>
                <input
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="title"
                  name=""
                  onChange={handleChange}
                  defaultValue={info && info.title}
                />
              </div>
             
              <div className="flex flex-col gap-4">
                <label htmlFor="">Site Description</label>
                <textarea
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="description"
                  name=""
                  onChange={handleChange}
                  defaultValue={info && info.description}
                />
              </div>


              <div className="flex flex-col gap-4">
                <label htmlFor="">Site Keywords ( Separate with commas )</label>
                <textarea
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="keywords"
                  name=""
                  onChange={handleChange}
                  defaultValue={info && info.description}
                />
              </div>
             
             
             
             
              <div className="flex ">
                <button
                  className="bg-bg w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Update Package{" "}
                  {updateSeoLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};
