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
           <div>
            <Link to="/package/unuploadedpackages">unuploaded Packages</Link>
           </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
