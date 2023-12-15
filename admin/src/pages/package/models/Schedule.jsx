import { Backdrop } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import CropEasy from "../../../utils/crop/CropEasy";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";
import { MyContext } from "../../../context/Context";

export const Schedule = ({setScheduleOpen, scheduleOpen, pack, reFetch})=> {
    const [editable, setEditable] = useState(null)
    const {setNotificationMessage} = useContext(MyContext)
    const [scheduleLoading,setScheduleLoading] = useState(false)
    const [schedule, setSchedule] = useState([])
    const [showNextDayInput, setShowNextDayInput] = useState(false)
    const handleClose = () => {
        setScheduleOpen(false);
      };
      useEffect(()=>{
        setSchedule(pack.schedule)
      }, [pack, scheduleOpen])
      const [info,setInfo] = useState({})
      const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(info);
      };
      const handleAddNewDay = (e) => {
        let confirmation = window.confirm("Sure to add this day?")
        if(confirmation){
            e.preventDefault();
            setSchedule(prev => ([...prev, info]))
            document.getElementById('newDayForm').reset()
            setInfo({})
            setShowNextDayInput(false)
        }
        
      }

    const handleShoeNextDayInput = (e) => {
        e.preventDefault()
        setShowNextDayInput(true)
    }
      
      
      
      const handleSubmit = async (e) => {
        e.preventDefault()
        setScheduleLoading(true)
        try {
            const scheduleobj = {schedule}
            const res = await axiosInstance.patch(`/package/${pack._id}`, scheduleobj)
            setScheduleLoading(false)
            setScheduleOpen(false)
            setNotificationMessage("Schedule updated successfully")
            reFetch()
            
          
        } catch (error) {
            alert(error)
            setScheduleLoading(false)
        }
      }
     
     

      const cancelEdit = (index) => {
        setEditable(null)
      };

      const [currentDay, setCurrentDay] = useState({})
      const makeScheduleEditable = (index) => {
        if(editable === null){
            setEditable(index)
            setCurrentDay(schedule[index])
        }
        else{
            alert("Please complete editing the current day schedule!")
        }
      }
      const handleEditScheduleChange = (e) => {
        setCurrentDay(prev => ({...prev, [e.target.id]: e.target.value}))
        console.log(currentDay)
      }
      const updateEdit = (e, index) => {
        e.preventDefault()
        const newSchedule = schedule;
        newSchedule[index] = currentDay
        setSchedule(newSchedule)
        console.log(schedule)
        setEditable(null)
      }
      const makeScheduleDelete = (index) => {
        setSchedule(schedule.filter((item, ind) => (ind !== index)))
      }

    return(
        <div>
      <Backdrop
        sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={scheduleOpen}

      >
       
        <div className="bg-[white] w-[50%] p-4 rounded max-h-[700px] overflow-scroll no-scrollbar">
          <div className="flex justify-between packs-center border-b pb-4 border-[#e2e2e2]">
            <h1 className="text-xl font-bold">Schedule</h1>
            <img
              src="/images/icons/Close.png"
              className="w-6 cursor-pointer"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="px-4 py-12">
            {schedule && schedule?.map((item,index)=>(
                <div key={index} className="bg-[#edecec] mb-4 rounded px-4 py-2 flex flex-col items-start gap-4 relative">
                    <div className="absolute top-2 right-2 flex items-center gap-4">
                        <img src="/images/icons/edit.png" alt="" className="w-5 cursor-pointer" onClick={()=>makeScheduleEditable(index)} />
                        <img src="/images/icons/trash.png" alt="" className="w-5 cursor-pointer" onClick={()=>makeScheduleDelete(index)} />

                    </div>
                    <h1 className="text-lg font-medium flex gap-4 items-center">Day {index+1} - <input onChange={handleEditScheduleChange} type="text" id="dayTitle" className={`${editable ===index ? "bg-[white]":"bg-[transparent]"} grow px-4 py-2 rounded`} defaultValue={item.dayTitle} disabled={editable === index ? false:true}/></h1>
                    <textarea name="" onChange={handleEditScheduleChange} id="dayDesc" className={`${editable ===index ? "bg-[white]":"bg-[transparent]"} w-full px-4 py-2 rounded` } disabled={editable === index ? false:true} defaultValue={item.dayDesc}></textarea>
                   { editable === index && <div className="text-xs flex items-center gap-4"><button className="bg-bg text-[white] px-4 py-2 rounded" onClick={(e)=>updateEdit(e,index)}>Update Edit</button>
                                            <button className="bg-bg text-[white] px-4 py-2 rounded" onClick={()=>cancelEdit(index)}>Cancel Edit</button>  </div>
                   }
                </div>
            ))}
          {schedule &&  schedule.length === 0 &&  <div className="flex flex-col items-center border border-[grey] rounded gap-4 py-8">
                    <img src="/images/icons/notFound.png" alt="" className="w-20"/>
                    <h1 className="text-[grey]">No Schedule added</h1>
                </div>}

          </div>
         



          <div className="px-4 py-8">
               <form action="" id="newDayForm">

               <div>
                    <button className="bg-bg text-[white] px-4 py-2 rounded" onClick={handleShoeNextDayInput}>Add day</button>
                </div>
                <div className={`${showNextDayInput ? " max-h-[500px]" : "max-h-[0px]"} overflow-hidden transition-all duration-300 my-8 flex flex-col gap-4 px-4 border rounded border-[#eeeeee]`}>
                   <div className="flex flex-col gap-4 mt-4">
                   <label htmlFor="">Title</label>
                    <input type="text" id="dayTitle" autoComplete="off" onChange={handleChange} className="bg-[#eeeeee] px-4 py-2 rounded" />
                   </div>
                   <div className="flex flex-col gap-4">
                   <label htmlFor="">Description</label>
                    <textarea id="dayDesc" autoComplete="off" onChange={handleChange} className="bg-[#eeeeee] whitespace-pre	 px-4 py-2 rounded" />
                   </div>
                   <div className="mb-4">
                    <button className="bg-bg text-[white] px-4 py-2 rounded" onClick={handleAddNewDay}>Add</button>
                   </div>

                </div>



               <div className="flex mt-12">
                
                <button
                  className="bg-bg w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Update Schedule{" "}
                  {scheduleLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>
               </form>
          </div>
        </div>
      </Backdrop>
    </div>
    )
}