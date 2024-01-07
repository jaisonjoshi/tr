import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Section } from "./models/Section";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";

const Sections = () => {
    const navigate = useNavigate()

    const [createSectionOpen, setCreateSectionOpen] = useState(false)
 const [sections, setSections] = useState(null)
 const {data, loading, error, reFetch} = useFetch('/category')
 useEffect(()=>{
    setSections(data)
 }, [data])

  return (
    <div>
      <div className="  ">
        <Section createSectionOpen={createSectionOpen} setCreateSectionOpen={setCreateSectionOpen} reFetch={reFetch}/>
        <Navbar />
        <div className=" flex mt-[70px] h-full w-full">
          <Sidebar />
          <div className="px-8 grow flex ml-[300px] flex-col">
           <div className="flex justify-between items-center">
           <h1 className="text-2xl my-12 font-bold">Sections</h1>
            <button className="bg-bg text-[white] px-4 py-2 rounded" onClick={()=>setCreateSectionOpen(true)}>Create a new Section</button>
           </div>
           <div>

            {loading ?

            <div className="flex justify-center mt-40">
                <ClipLoader />
            </div>:

            (error ?(
                <div className="flex justify-center mt-40"> 
                    <img src="/images/serverdown.png" alt="" />
                </div>
            ) :(
                <div className="flex flex-col gap-4 mt-12">
                    {sections && sections?.map((item, index)=>(
                        <div className="cursor-pointer shadow-xl py-4 px-4 border border-[#13135a] rounded" key={index} onClick={()=>navigate(`/package/sections/${item._id}`)}>
                            <h1 className="text-xl font-bold">{item.name}</h1>
                        </div>
                    ))}
                </div>
            ))
            
            
            
            }




           
          
           
           </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sections;
