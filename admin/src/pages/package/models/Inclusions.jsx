import Backdrop from "@mui/material/Backdrop";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import axiosInstance from "../../../utils/axiosInstance";
import ClipLoader from "react-spinners/ClipLoader";
import { MyContext } from "../../../context/Context";

export const Inclusions = ({
    setInclusionsOpen,
  inclusionsOpen,
  pack,
  reFetch,
}) => {
    const {setNotificationMessage} = useContext(MyContext)

const [inclusion, setInclusion] = useState(null)
  const [info, setinfo] = useState([]);
  useEffect(()=>{
    setinfo(pack.inclusions)
    console.log(info)
  }, [pack, inclusionsOpen])
  const [inclusionsLoading, setInclusionsLoading] = useState(false);
    const handleChange = (e) => {
        setInclusion(e.target.value)

    }
 const addInclusion = (e) => {
    e.preventDefault()
    if(inclusion !== null){
        setinfo((prev)=> ([...prev, inclusion]))
        setInclusion(null)
        document.getElementById('inclusions').reset()
    }
    else{
        alert("Please enter some value!")
    }
    
 }

 const handleDelete = (index) => {
    setinfo(info.filter((item,ind)=> index !== ind))
 }


  const handleClose = () => {
    setInclusionsOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInclusionsLoading(true);
    try {
        
       
      
      const res = await axiosInstance.patch(
        `/package/${pack._id}`,{inclusions: info}
        
      );
      console.log(res)
      setInclusionsLoading(false);
      setInclusionsOpen(false);
      document.getElementById("inclusions").reset();

      setNotificationMessage("Updated Inclusions successfully.")
      reFetch();
    } catch (error) {
      alert(
        "Something happened. Please try again or contact service provider."
      );
      setInclusionsLoading(false);
    }
  };
  return (
    <div>
      <Backdrop
        sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={inclusionsOpen}
      >
        <div className="bg-[white] w-[50%] p-4 rounded max-h-[700px] overflow-scroll no-scrollbar">
          <div className="flex justify-between packs-center border-b pb-4 border-[#e2e2e2]">
            <h1 className="text-xl font-bold">Inclusions</h1>
            <img
              src="/images/icons/Close.png"
              className="w-6 cursor-pointer"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="py-8 px-4">
           
             
            {info && info.length === 0 &&
              <div className="flex flex-col items-center gap-4 py-8">
              <img src="/images/icons/notFound.png" alt="" className="w-20"/>
              <h1 className="text-[grey]">No Inclusions added</h1>
          </div>
            }
           <div className="py-12 flex justify-start gap-4 flex-wrap">
           {info && info.map((item, index)=>(
                <span className=" bg-[#c7c7c7] py-1 px-1 rounded-full text-[#393939] flex gap-4 items-center" key={index}>
                    <span className="ml-2">{item}</span> <div className="bg-[#555555] flex justify-center items-center  rounded-full text-[white] w-5 h-5"><img src="/images/icons/Close.png" onClick={()=>handleDelete(index)} className="w-full cursor-pointer" alt="" /></div>
                </span>
            ))}
           </div>

<form
              action=""
              id="inclusions"
              className="text-[#414141] flex flex-col gap-8"
            >

        <div className="flex flex-col gap-2 items-start">
        <input
                  className="bg-[#eeeeee] w-full px-4 py-2 rounded"
                  type="text"
                  id="inclusion"
                  name=""
                  onChange={handleChange}
                  placeholder="Type inclusion"
                />
                <button className="bg-bg text-[white] px-4 py-1 rounded" onClick={addInclusion}>Add</button>
        </div>

             
             
             
             
             
              <div className="flex ">
                <button
                  className="bg-bg w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Update Inclusions
                  {inclusionsLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};
