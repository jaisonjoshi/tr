import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-bg h-full w-[300px] fixed top-[70px] ">
     



      <div className="text-[white]  pt-8 ">
        <div>
            <h1 className=" text-lg font-bold px-4 py-4  cursor-pointer hover:bg-[#1A2342]">Home</h1>
            <h1 className=" text-lg font-bold px-4 py-4 ">Tour Packages</h1>
            <div>
                <ul className="">
                    <Link to="/package/overview">
                    <li className="pl-8 py-2 cursor-pointer hover:bg-[#1A2342]">
                        Overview
                    </li></Link>
                    <Link to="/package/createpackage"> 
                    <li className="pl-8 py-2 cursor-pointer hover:bg-[#1A2342]">
                        Create Package
                    </li></Link>
                    <Link to="/package/sections"> 
                    <li className="pl-8 py-2 cursor-pointer hover:bg-[#1A2342]">
                        Sections
                    </li></Link>
                </ul>
            </div>
            <h1 className=" text-lg font-bold px-4 py-4  ">Reviews</h1>
            <div>
                <ul className="">
                    <Link to="/reviews">
                    <li className="pl-8 py-2 cursor-pointer hover:bg-[#1A2342]">
                        All Reviews
                    </li></Link>
                    <Link to="/reviews/new">
                    <li className="pl-8 py-2 cursor-pointer hover:bg-[#1A2342]">
                        Create Review
                    </li></Link>
                   
                </ul>
            </div>



            <h1 className=" text-lg font-bold px-4 py-4  ">Popular places</h1>
            <div>
                <ul className="">
                    <Link to="/popularplaces">
                    <li className="pl-8 py-2 cursor-pointer hover:bg-[#1A2342]">
                        Popular places list
                    </li></Link>
                   
                   
                </ul>
            </div>


        </div>
      </div>
    </div>
  );
};

export default Sidebar;
