import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";

const Unuploadedpackages = () => {
    const [packages, setPackages] = useState([])
    const {data, loading,error} = useFetch('/package?uploaded=false')
    useEffect( ()=>{
        setPackages(data) 
        console.log(data)  
    },[data])
 

  return (
    <div>
      <div className="  ">
        <Navbar />
        <div className=" flex mt-[70px] h-full w-full">
          <Sidebar />
          <div className="px-8 py-8 grow flex ml-[300px] flex-col">
           <div className="">
                <h1 className="text-3xl font-medium">Unuploaded Packages</h1>
           </div>
          {loading ? <div className="flex flex-col items-center mt-60"><ClipLoader /><h1 className="text-[grey] mt-4">Fetching data</h1></div> : 
          ( error ? (
            <div className="flex flex-col items-center gap-4 mt-40">
                <img src="/images/serverdown.png" className="w-20" alt="" />

                <h1>Some error occured. Please try again.</h1>
            </div>
          ) :
          
          
          (<div className="mt-16 flex flex-wrap gap-[2.6%]">
            {data.length !== 0 && (data?.map((item,index)=>(
                <div key={index} className="mb-8 w-[23%]">
                        <div className=" flex flex-col gap-6 shadow-xl pb-4 rounded" >
                            <div className="w-full aspect-video h-full">
                            <img src={item.titleImage} alt="" className="w-full aspect-video skeleton"/>
                            </div>
                            <h1 className="text-2xl font-bold text-center">{item.title}</h1>
                            <div className="flex justify-center">
                                <Link to={`/package/${item._id}`}><button className="bg-bg text-[white] px-4 py-2 rounded">Update</button></Link>
                            </div>
                        </div>
                </div>
            ))) }



           </div>))}
           

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unuploadedpackages;
