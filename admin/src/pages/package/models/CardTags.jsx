import Backdrop from "@mui/material/Backdrop";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import axiosInstance from "../../../utils/axiosInstance";
import ClipLoader from "react-spinners/ClipLoader";
import { MyContext } from "../../../context/Context";

export const CardText = ({
    setCardTextOpen,
  cardTextOpen,
  pack,
  reFetch,
}) => {
    const {setNotificationMessage} = useContext(MyContext)


  const [info, setinfo] = useState({cardTag1:"",cardTag2:""});
  useEffect(()=>{
    setinfo(pack.cardTags)
    console.log(info)
  }, [pack, cardTextOpen])
  const [cardTagLoading, setCardTagLoading] = useState(false);
    
  const handleChange = (e) => {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };


  const handleClose = () => {
    document.getElementById("cardTags").reset();
    setCardTextOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCardTagLoading(true);
    try {
        const {_id, ...rest} = info
      const cardTags = {
        ...rest
      };
      console.log(cardTags)
      const res = await axiosInstance.patch(
        `/package/${pack._id}`,{cardTags: cardTags}
        
      );
      setCardTagLoading(false);
      setCardTextOpen(false);
      document.getElementById("cardTags").reset();

      setNotificationMessage("Updated card Tags successfully.")
      reFetch();
    } catch (error) {
      alert(
        "Something happened. Please try again or contact service provider."
      );
      setCardTagLoading(false);
    }
  };
  return (
    <div>
      <Backdrop
        sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={cardTextOpen}
      >
        <div className="bg-[white] w-[50%] p-4 rounded max-h-[700px] overflow-scroll no-scrollbar">
          <div className="flex justify-between packs-center border-b pb-4 border-[#e2e2e2]">
            <h1 className="text-xl font-bold">Card Tags</h1>
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
              id="cardTags"
              className="text-[#414141] flex flex-col gap-8"
            >
              <div className="flex flex-col gap-4">
                <label htmlFor="">Card Tag 1</label>
                <input
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="cardTag1"
                  name=""
                  onChange={handleChange}
                  defaultValue={info && info.cardTag1}
                />
              </div>
             
              <div className="flex flex-col gap-4">
                <label htmlFor="">Card Tag 2</label>
                <input
                  className="bg-[#eeeeee] px-4 py-2 rounded"
                  type="text"
                  id="cardTag2"
                  name=""
                  onChange={handleChange}
                  defaultValue={info && info.cardTag2}
                />
              </div>


             
             
             
             
             
              <div className="flex ">
                <button
                  className="bg-bg w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Update Card Tags{" "}
                  {cardTagLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};
