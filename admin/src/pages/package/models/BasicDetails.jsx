import Backdrop from "@mui/material/Backdrop";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import axiosInstance from "../../../utils/axiosInstance";
import ClipLoader from "react-spinners/ClipLoader";
import { MyContext } from "../../../context/Context";

export const BasicDetails = ({
  basicDetailsOpen,
  setBasicDetailsOpen,
  pack,
  reFetch,
}) => {
    const {setNotificationMessage} = useContext(MyContext)

  const [info, setinfo] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
    
  const handleChange = (e) => {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };
  console.log(pack);
  const handleClose = () => {
    document.getElementById("basicDetails").reset();
    setBasicDetailsOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const updatedPackage = {
        ...info,
      };
      const res = await axiosInstance.patch(
        `/package/${pack._id}`,
        updatedPackage
      );
      setUpdateLoading(false);
      setBasicDetailsOpen(false);
      document.getElementById("basicDetails").reset();

      setNotificationMessage("Updated basic details successfully.")
      reFetch();
    } catch (error) {
      alert(
        "Something happened. Please try again or contact service provider."
      );
      setUpdateLoading(false);
    }
  };
  return (
    <div>
      <Backdrop
        sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={basicDetailsOpen}
      >
        <div className="bg-[white] w-[50%] p-4 rounded max-h-[700px] overflow-scroll no-scrollbar">
          <div className="flex justify-between packs-center border-b pb-4 border-[#e2e2e2]">
            <h1 className="text-xl font-bold">Basic Details</h1>
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
              id="basicDetails"
              className="text-[#414141] flex flex-col gap-8"
            >
              <div className="flex flex-col gap-4">
                <label htmlFor="">Title</label>
                <input
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="title"
                  name=""
                  onChange={handleChange}
                  defaultValue={pack.title}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="">Short Description</label>
                <input
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="shortDescription"
                  name=""
                  onChange={handleChange}
                  defaultValue={pack.shortDescription}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="">Description Title</label>
                <input
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="descriptionTitle"
                  name=""
                  onChange={handleChange}
                  defaultValue={pack.descriptionTitle}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="">Description</label>
                <textarea
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="description"
                  name=""
                  onChange={handleChange}
                  defaultValue={pack.description}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="">Duration (Short Form, Eg:, 3D/4N)</label>
                <input
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="shortDuration"
                  name=""
                  onChange={handleChange}
                  defaultValue={pack.shortDuration}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="">
                  Duration ( In words, Eg:, 3 Days and 4 Nights )
                </label>
                <input
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="duration"
                  name=""
                  onChange={handleChange}
                  defaultValue={pack.duration}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="">Price ( Avoid spaces, symbols etc. )</label>
                <input
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="number"
                  id="price"
                  name=""
                  onChange={handleChange}
                  defaultValue={pack.price}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="">Location</label>
                <input
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="location"
                  name=""
                  onChange={handleChange}
                  defaultValue={pack.location}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="">Category</label>
                <select
                  name=""
                  id="category"
                  onChange={handleChange}
                  className="bg-[#eeeeee] px-4 py-3 rounded"
                >
                  <option value={null}>select</option>
                  <option value="family">Family</option>
                  <option value="honeymoon">Honeymoon</option>
                  <option value="group">Group/Friends</option>
                  <option value="adventure">Adventure</option>
                </select>
              </div>
              <div className="flex ">
                <button
                  className="bg-bg w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Update Package{" "}
                  {updateLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};
