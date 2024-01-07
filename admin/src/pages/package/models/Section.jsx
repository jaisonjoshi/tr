import Backdrop from "@mui/material/Backdrop";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import axiosInstance from "../../../utils/axiosInstance";
import ClipLoader from "react-spinners/ClipLoader";
import { MyContext } from "../../../context/Context";

export const Section = ({
    createSectionOpen,
    setCreateSectionOpen,
    reFetch

}) => {
    const {setNotificationMessage} = useContext(MyContext)

  const [info, setinfo] = useState({});
  const [createSectionLoading, setCreateSectionLoading] = useState(false);
    
  const handleChange = (e) => {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };
  const handleClose = () => {
    document.getElementById("newSection").reset();
    setCreateSectionOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateSectionLoading(true);
    try {
      const newCategory = {
        ...info,uploaded:false
      };
      const res = await axiosInstance.post(
        `/category/`,
        newCategory
      );
      setCreateSectionLoading(false);
      setCreateSectionOpen(false);
      document.getElementById("newSection").reset();

      setNotificationMessage("Created a new section successfully.")
      reFetch();
    } catch (error) {
      alert(
        "Something happened. Please try again or contact service provider."
      );
      setCreateSectionLoading(false);
    }
  };
  return (
    <div>
      <Backdrop
        sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={createSectionOpen}
      >
        <div className="bg-[white] w-[50%] p-4 rounded max-h-[700px] overflow-scroll no-scrollbar">
        <div className="flex justify-between packs-center border-b pb-4 border-[#e2e2e2]">
            <h1 className="text-xl font-bold">New Section</h1>
            <img
              src="/images/icons/Close.png"
              className="w-6 cursor-pointer"
              alt=""
              onClick={handleClose}
            />
          </div>
          <form id="newSection" className="my-12">

          <div className="flex flex-col gap-4 mb-8">
                <label htmlFor="">Name</label>
                <input
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="name"
                  name=""
                  onChange={handleChange}
                />
              </div>


          <div className="flex flex-col gap-4">
                <label htmlFor="">Description</label>
                <input
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="description"
                  name=""
                  onChange={handleChange}
                />
              </div>


              <div className="flex mt-16">
                <button
                  className="bg-bg w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Create new section
                  {createSectionLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>

          </form>
        
        </div>
      </Backdrop>
    </div>
  );
};
