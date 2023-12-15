import { useContext } from "react"
import { MyContext } from "../context/Context"

export const Notification = () => {
    const {notificationMessage,setNotificationMessage} = useContext(MyContext)
    return(
        <div className={`fixed max-w-[400px] flex justify-between items-start ${notificationMessage === null ? "hidden" : ""} top-4 right-4 bg-bg text-sm text-[white] z-[1000000000] px-8 py-4`}>
          <div className="flex items-start">
            <div className="">
                <h1>{notificationMessage}</h1>
            </div>
            
                <img src="/images/icons/Close.png" className="w-5 cursor-pointer" alt="" onClick={()=>setNotificationMessage(null)}/>
           
          </div>
          
           </div>
    )
}