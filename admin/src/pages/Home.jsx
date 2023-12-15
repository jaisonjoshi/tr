import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"



const Home = () => {
    return(
        <div className="h-[100vh] mt-[70px]  flex flex-col">
            <Navbar />
            <div  className="w-full grow flex">
            <Sidebar />


            </div>
           
        </div>
    )
}

export default Home