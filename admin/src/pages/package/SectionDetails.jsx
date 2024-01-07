import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../utils/axiosInstance";
import { generateUrl } from "../../utils/generateUrl";
import { SectionUpdate } from "./models/SectionUpdate";

const SectionDetails = () => {
    const location = useLocation()
    const id = location.pathname.split('/')[3]
    const navigate = useNavigate()
    const [updateSectionOpen, setUpdateSectionOpen] = useState(false)
    const [packageAddLoading, setPackageAddLoading] = useState(false)
    const [packageDeleteLoading, setPackageDeleteLoading] = useState(false)
    const {data, loading, error , reFetch} = useFetch(`/category/${id}`)
    const [category, setCategory] = useState(null)
    const [packages, setPackages] = useState(null)
    const {data:data2, loading:loading2, error:error2 } = useFetch('/package/packagetitles')

    useEffect(()=>{
        setCategory(data)
       
    }, [data])
    useEffect(()=>{
        setPackages(data2)
    }, [data2])
    const [selectedPackage, setSelectedPackage] = useState(null)
    const handleChange = (e) => {
        setSelectedPackage(e.target.value)
    }
    const handleAddPackage = async (e) => {
        e.preventDefault()
        setPackageAddLoading(true)
        try{
            if(category.packages){
                const newList = data?.packages.map(item => item._id);
                console.log("hellooooo", newList)
                if(newList.includes(selectedPackage)){
                    alert("This package is already added")
                }
                else{
                    const res = await axiosInstance.patch(`/category/${id}`,
                {packages: [...category.packages, selectedPackage]})
                console.log(category.packages)
                reFetch()


                }
            }
            
           
                
            
            
        

        }catch(error){
            console.log(error)
            setPackageAddLoading(false)
            

        }
        setPackageAddLoading(false)

        
    }

    const handleDeleteCategory = async (e, id) => {
        e.preventDefault()
        const confirm = window.confirm("Are you sure to delete this List")
        if(confirm) {
            await axiosInstance.delete(`/category/${id}`)
            navigate('/package/sections')
        }

    }

    const handleDelete = async (e, packid)=>{
        e.preventDefault()
        const confirmation = window.confirm("Are you sure to remove this package from the list?");

if (confirmation) {
    setPackageDeleteLoading(true);
    try {
        const currentList = data?.packages.map(item => item._id);
        const newList = currentList.filter(item => item !== packid);

        await axiosInstance.patch(`/category/${id}`, { packages: newList });
        // Assuming categoryId represents the category ID being modified

        reFetch();
        setPackageDeleteLoading(false);
    } catch (error) {
        console.log(error);
        setPackageDeleteLoading(false);
    }
}

    }
 

  return (
    <div>
      <div className="  ">
        <SectionUpdate updateSectionOpen={updateSectionOpen} category={category} setUpdateSectionOpen={setUpdateSectionOpen} reFetch={reFetch} />
        <Navbar />
        <div className=" flex mt-[70px] h-full w-full">
          <Sidebar />
          <div className="px-8 grow flex ml-[300px] flex-col">
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
   category && category !== null &&(
    <div className="">
        <div className="flex justify-between items-center">
        <h1 className="text-2xl mt-12 my-4 font-bold">{category.name}</h1>
        <button className={`${category._id === "65999e37781eacb0f9723bcc" ? "hidden" : ""} bg-bg text-[white] px-4 py-2 rounded`} onClick={(e) =>handleDeleteCategory(e, id)}>Delete this List </button>

        </div>
<p>{category.description}</p>

    <div>
        <button className="bg-bg text-[white] px-4 py-2 rounded mt-4" onClick={()=>setUpdateSectionOpen(true)}>Edit Title and Description</button>
        <form action="" className="shadow-xl border my-12 p-4">
            <div className="flex flex-col gap-4 my-6">
                <label htmlFor="">Select Packages</label>
                <select name="" id="" className="bg-[#eeeeee] px-4 py-4 rounded" onChange={(e)=>handleChange(e)}>
                    <option value="" disabled selected>Select a package here</option>
                    {
                        packages && packages !== null && packages?.map((item,index)=>(
                            <option value={item._id} className="" key={index}>{item.title}</option>
                        ))
                    }

                </select>
            </div>
            <div >
                    <button className="bg-bg px-4 py-2 rounded text-[white] flex gap-4 items-center" onClick={handleAddPackage}>         Add this Package to the List{packageAddLoading && <ClipLoader color="white" size={16} />}
</button>
            </div>
        </form>
    </div>

    {category.packages && category.packages.length === 0 && (
     <div className="flex flex-col items-center" >
         <img src="/images/icons/notuploaded.png" alt=""  className="w-20"/>
         <h1>No packages added to this category</h1>
     </div>
    )}
    {category.packages && category.packages.length !== 0 && (
        <div className="flex justify-start gap-[1.33%] my-12 flex-wrap">
            {category.packages?.map((item,index)=>(
                <div className="w-[24%]">
                     <div className="w-full bg-[white] mb-8 xs:mb-20 h-auto rounded-[4px] xs:rounded flex flex-col   shadow-xl">
                            <div className="relative ">

                            <img src={generateUrl(item.titleImage)} alt="" className=" rounded-t-[4px] xs:rounded-t-[10px]  w-full  aspect-video skeleton" />
                            </div>
                           
                           <div className="px-2 xs:px-4 flex flex-col justify-between flex-1 ">
                          <div className="">
                         
                            <div className="mt-3 xs:mt-3 flex justify-between items-start">
                                <h1 className="font-medium xs:font-semibold text-[13px] xs:text-[18px]  poppins whitespace-nowrap	overflow-hidden text-ellipsis	">{item.title}</h1>
                                <span className="text-[white] bg-[#000000c5] px-2 ml-4 py-1 text-[10px] md:text-[13px] rounded  ">{item.shortDuration}</span>

                            </div>
                            <div className="flex items-end gap-1 my-2 xs:my-1">
                                <p className=" text-[12px] xs:text-[15px] leading-[16px] xs:leading-[20px]  whitespace-nowrap text-[#4a4a4a]	overflow-hidden text-ellipsis	 w-[90%]">{item.location.charAt(0).toUpperCase()+ item.location.slice(1)}</p>

                            </div>
                            <div className="mt-2">
                                <p className="poppins text-[#4a4a4a] text-[10px] xs:text-[13px] line-clamp-3">{item.shortDescription}</p>
                            </div>
                            <div className="mt-4 ">
                                <div className=" poppins text-[#4a4a4a] ">
                                    <div className="flex items-start gap-1 mb-1 ">
                                        {item.cardTags.cardTag1 !== "" && <img src="/images/icons/tick.png" alt=""  className="w-4"/>}
                                        <span className="text-[10px] xs:text-[14px]  sm:mt-[-3px] whitespace-nowrap	overflow-hidden text-ellipsis">{item.cardTags.cardTag1}</span>
                                    </div>
                                    <div className="flex  items-start gap-1 ">
                                        {item.cardTags.cardTag2 !== "" && <img src="/images/icons/tick.png" alt=""  className="w-4"/>}
                                        <span className="text-[10px] xs:text-[14px] sm:mt-[-3px] whitespace-nowrap	overflow-hidden text-ellipsis">{item.cardTags.cardTag2}</span>
                                    </div>
                                </div>
                                
                            </div>
                          </div>
                            <div className="mt-2 xs:mt-4 mb-2 xs:mb-4 flex justify-between items-end">
                                <Link href={`/travelpackage/${item._id}`}><button className="bg-[#05CAA6] text-white font-bold text-[10px] xs:text-[14px] px-6 xs:px-8 rounded-full py-2">Explore</button></Link>
                                <div className="w-[30%] flex flex-col items-end  text-[15px] xs:text-[18px]">
                               <span className="font-extrabold roboto flex gap-1 items-center "> <span className='text-base xs:text-2xl'>₹</span><span>{item.price.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</span></span>
                               <span className="text-[10px] xs:text-[12px] roboto text-[#585858]">Per Person</span>
                                </div>

                                

                            </div>
                            <div>
                                    <button className="bg-bg py-2 text-[white] rounded w-full mb-2 mt-8 flex justify-center items-center gap-4" onClick={(e)=>handleDelete(e, item._id)}>Remove this package {packageDeleteLoading && <ClipLoader color="white" size={16} />}</button>
                                </div>

                           </div>
                                
                           
                        </div>
                        
                </div>
            ))}
        </div>
    )}

</div>
   )
))



}
           
           </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDetails;
