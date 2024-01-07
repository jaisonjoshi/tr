import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Overview = () => {
 

  return (
    <div>
      <div className="  ">
        <Navbar />
        <div className=" flex mt-[70px] h-full w-full">
          <Sidebar />
          <div className="px-8 grow flex ml-[300px] flex-col">
            <h1 className="text-2xl my-12 font-bold">Travel Packages Dashboard</h1>
           <div>
           
           <div className="w-[15%] mb-8 cursor-pointer shadow-xl py-8 border border-[#13135a] rounded flex flex-col items-center gap-4">
           <Link to="/package/unuploadedpackages" className="w-full flex flex-col items-center">
                           <div className="w-[25%]">
                            <img src="/images/icons/notuploaded.png" alt="" className="w-full"/>
                            </div>                            <h1 className="text-lg">Packages not Uploaded</h1>
                            </Link></div>
           
           </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
