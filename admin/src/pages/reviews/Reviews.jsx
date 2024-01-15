import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../utils/axiosInstance";
import { MyContext } from "../../context/Context";

const Reviews = () => {
  const navigate = useNavigate()
  const {setNotificationMessage} = useContext(MyContext)

  const [reviews, setReviews] = useState([])
  const {data, loading, error, reFetch} = useFetch('/reviews');
const [deleteLoading, setDeleteLoading] =useState(false)
    useEffect(()=>{
      setReviews(data)
       
    },[data])

const handleDeleteReview =  async(id) => {
  let confirm = window.confirm("This action is not reversable! Are you sure to delete this review?");
  if(confirm){
      await axiosInstance.delete(`/reviews/${id}`);
      setNotificationMessage("Deleted Review successfully")
      reFetch();

  }
}
  return (
    <div>
      <div className="  ">
        <Navbar />
        <div className=" flex mt-[70px] h-full w-full">
          <Sidebar />
          <div className="px-8 grow flex ml-[300px] flex-col">
            <h1 className="text-2xl my-12 font-bold">All Reviews</h1>
           {
            loading ?
            <div className="flex justify-center mt-40"><ClipLoader /></div>
           :
          (           <div className="flex gap-[3.33%] flex-wrap">
          {reviews && reviews?.map((item, index)=>(
           <div className="px-8 mb-8 w-[30%] shadow-xl flex  flex-col justify-between rounded  py-8" key={index}>
           <div>
           <img src="/images/icons/quote.png" alt="" className="w-6 md:w-8  md:mb-4"/>
           <div>
               <p className="poppins text-[#868686] text-sm text-left md:text-base italic mb-8"> {item.reviewnote}</p>
           </div>
           <div className='flex justify-start'>
          
           </div>
</div>
<div>
<div className="flex gap-4 items-center">
               <div className='w-16 h-16 rounded-full relative overflow-hidden'>
               <img src={item.image} alt="" className="w-full h-full absolute z-[-10] top-0 left-0 object-cover" />

               </div>
               <div className=''>
                   <h1 className="poppins text-base font-semibold">{item.author}</h1>
                   <p className="italic text-sm text-[#868686]">{item.place}</p>
               </div>
           </div>
           <div className="flex gap-[10%] mt-8">
            <button className="bg-bg w-[45%] text-[white] rounded py-2" onClick={()=> navigate(`/reviews/update/${item._id}`)}>Update</button>
            <button className="bg-bg w-[45%] text-[white] rounded py-2" onClick={()=>handleDeleteReview(item._id)}>Delete {deleteLoading && <ClipLoader color="white" size={16} />}</button>
           </div>
       </div></div>
          ))}</div>)}
           
           

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
