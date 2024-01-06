import { Link, useLocation } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import useFetch from "../../hooks/useFetch"
import { useEffect, useState } from "react"
import { BasicDetails } from "./models/BasicDetails"
import ClipLoader from "react-spinners/ClipLoader"
import { Images } from "./models/Images"
import { TitleImage } from "./models/TitleImage"
import { LocationTags } from "./models/LocationTags"
import { Schedule } from "./models/Schedule"
import { Seo } from "./models/Seo"
import { CardText } from "./models/CardTags"
import { Activities } from "./models/Activities"
import { capitaliseFirstLetter } from "../../utils/firstLetterCapitalise"
import { PlacesToVisit } from "./models/PlacestoVisit"
import { Inclusions } from "./models/Inclusions"
import { Exclusions } from "./models/Exclusions"



const Package = () => {
    const location = useLocation()
    const id = location.pathname.split('/')[2];
    const {data, loading, error, reFetch} = useFetch(`/package/${id}`)
    const [pack, setPackage] = useState({})
    useEffect(()=>{
        setPackage(data)
    },[data])


    const [basicDetailsOpen, setBasicDetailsOpen] = useState(false)
    const [imagesOpen, setImagesOpen] = useState(false)
    const [titleImageOpen, setTitleImageOpen] = useState(false)
    const [locationTagsOpen, setLocationTagsOpen] = useState(false)
    const [scheduleOpen, setScheduleOpen] = useState(false)
    const [seoOpen, setSeoOpen] = useState(false)
    const [cardTextOpen, setCardTextOpen] =useState(false)
    const [activityOpen, setActivityOpen] = useState(false)
    const [placesToVisitOpen, setPlacesToVisitOpen] = useState(false)
    const [inclusionsOpen, setInclusionsOpen] = useState(false)
    const [exclusionsOpen, setExclusionsOpen] = useState(false)






    return(
        <div>
      <div className="  ">
        <BasicDetails basicDetailsOpen={basicDetailsOpen} setBasicDetailsOpen={setBasicDetailsOpen} pack={pack} reFetch={reFetch}/>
       <Images  imagesOpen={imagesOpen} setImagesOpen={setImagesOpen} pack={pack} reFetch={reFetch} />
       <TitleImage titleImageOpen={titleImageOpen} setTitleImageOpen={setTitleImageOpen} pack={pack} reFetch={reFetch} />
       <LocationTags locationTagsOpen={locationTagsOpen} setLocationTagsOpen={setLocationTagsOpen} pack={pack} reFetch={reFetch} />
       <Schedule scheduleOpen={scheduleOpen} setScheduleOpen={setScheduleOpen} pack={pack} reFetch={reFetch} />
       <Seo seoOpen={seoOpen} setSeoOpen={setSeoOpen} pack={pack} reFetch={reFetch} />
       <CardText cardTextOpen={cardTextOpen} setCardTextOpen={setCardTextOpen} pack={pack} reFetch={reFetch} />
        <Activities activityOpen={activityOpen} setActivityOpen={setActivityOpen} pack={pack} reFetch={reFetch} />
        <PlacesToVisit placesToVisitOpen={placesToVisitOpen} setPlacesToVisitOpen={setPlacesToVisitOpen} pack={pack} reFetch={reFetch} />
        <Inclusions inclusionsOpen={inclusionsOpen} setInclusionsOpen={setInclusionsOpen} pack={pack} reFetch={reFetch} />
        <Exclusions exclusionsOpen={exclusionsOpen} setExclusionsOpen={setExclusionsOpen} pack={pack} reFetch={reFetch} />

       <Navbar />
        <div className=" flex mt-[70px] h-full w-full overflow-auto">
          <Sidebar />
          <div className=" grow h-full flex fixed w-package right-0  top-[70px]  ">
                <div className=" h-full px-8 py-12  grow overflow-scroll no-scrollbar">
                        <h1 className="text-2xl font-semibold">Update Package</h1>
                        {loading?  <div className="flex px-8 justify-start mt-40"><ClipLoader /></div> : 

( error ? (
    <div className="flex flex-col items-center gap-4 mt-40">
        <img src="/images/serverdown.png" className="w-20" alt="" />

        <h1>Some error occured. Please try again.</h1>
    </div>
  ) :
                        
                        (
                            pack &&
                            <div className="flex flex-wrap gap-[5%] pt-12">
                           <div onClick={()=>setBasicDetailsOpen(true)} className="w-[30%] mb-8 cursor-pointer shadow-xl py-8 border border-[#13135a] rounded flex flex-col items-center gap-4">
                            <div className="w-[20%]">
                            <img src="/images/icons/edit.png" alt="" className="w-full"/>
                            </div>
                            <h1 className="text-lg">Basic Details</h1>
                           </div>



                           <div onClick={()=>setTitleImageOpen(true)} className="w-[30%] mb-8 cursor-pointer shadow-xl py-8 border border-[#13135a] rounded flex flex-col items-center gap-4">
                           <div className="w-[20%]">
                            <img src="/images/icons/image.png" alt="" className="w-full"/>
                            </div>                            <h1 className="text-lg">Title Image</h1>
                           </div>


                           <div onClick={()=>setImagesOpen(true)} className="w-[30%] mb-8 cursor-pointer shadow-xl py-8 border border-[#13135a] rounded flex flex-col items-center gap-4">
                           <div className="w-[25%]">
                            <img src="/images/icons/album.png" alt="" className="w-full"/>
                            </div>                            <h1 className="text-lg">Images</h1>
                           </div>



                           <div onClick={()=>setLocationTagsOpen(true)} className="w-[30%] mb-8 cursor-pointer shadow-xl py-8 border border-[#13135a] rounded flex flex-col items-center gap-4">
                           <div className="w-[25%]">
                            <img src="/images/icons/location.png" alt="" className="w-full"/>
                            </div>                            <h1 className="text-lg">Location Tags</h1>
                           </div>




                           <div onClick={()=>setScheduleOpen(true)} className="w-[30%] mb-8 cursor-pointer shadow-xl py-8 border border-[#13135a] rounded flex flex-col items-center gap-4">
                           <div className="w-[25%]">
                            <img src="/images/icons/schedule.png" alt="" className="w-full"/>
                            </div>                            <h1 className="text-lg">Schedule</h1>
                           </div>




                           <div onClick={()=>setSeoOpen(true)} className="w-[30%] mb-8 cursor-pointer shadow-xl py-8 border border-[#13135a] rounded flex flex-col items-center gap-4">
                           <div className="w-[25%]">
                            <img src="/images/icons/seo.png" alt="" className="w-full"/>
                            </div>                            <h1 className="text-lg">SEO</h1>
                           </div>


                           <div onClick={()=>setCardTextOpen(true)} className="w-[30%] mb-8 cursor-pointer shadow-xl py-8 border border-[#13135a] rounded flex flex-col items-center gap-4">
                           <div className="w-[25%]">
                            <img src="/images/icons/cardtext.png" alt="" className="w-full"/>
                            </div>                            <h1 className="text-lg">Card Tags</h1>
                           </div>
                           <div onClick={()=>setActivityOpen(true)} className="w-[30%] mb-8 cursor-pointer shadow-xl py-8 border border-[#13135a] rounded flex flex-col items-center gap-4">
                           <div className="w-[25%]">
                            <img src="/images/icons/activity.png" alt="" className="w-full"/>
                            </div>                            <h1 className="text-lg">Activities</h1>
                           </div>


                           <div onClick={()=>setPlacesToVisitOpen(true)} className="w-[30%] mb-8 cursor-pointer shadow-xl py-8 border border-[#13135a] rounded flex flex-col items-center gap-4">
                           <div className="w-[25%]">
                            <img src="/images/icons/placestovisit.png" alt="" className="w-full"/>
                            </div>                            <h1 className="text-lg">Places To Visit</h1>
                           </div>



                           <div onClick={()=>setInclusionsOpen(true)} className="w-[30%] mb-8 cursor-pointer shadow-xl py-8 border border-[#13135a] rounded flex flex-col items-center gap-4">
                           <div className="w-[25%]">
                            <img src="/images/icons/inclusions.png" alt="" className="w-full"/>
                            </div>                            <h1 className="text-lg">Inclusions</h1>
                           </div>

                           <div onClick={()=>setExclusionsOpen(true)} className="w-[30%] mb-8 cursor-pointer shadow-xl py-8 border border-[#13135a] rounded flex flex-col items-center gap-4">
                           <div className="w-[25%]">
                            <img src="/images/icons/exclude.png" alt="" className="w-full"/>
                            </div>                            <h1 className="text-lg">Exclusions</h1>
                           </div>




                        </div>
                        ))}
                </div>
                <div className=" h-full px-8 py-12 w-[50%] min-w-[50%]  grow overflow-hidden ">
                    <h1 className="text-2xl font-semibold">Package preview</h1>
                    {
                        loading ? 
                        <div className="flex justify-start px-8 mt-40"><ClipLoader /></div> :
                        (
                            pack &&  <div className="px-8 py-8 border border-[#e8e8e8] min-h-[500px] max-h-[650px] overflow-auto  shadow-xl rounded my-4">
                        
                        <div className="flex items-start justify-between">
                        <h1 className="text-xl font-bold">{pack.title}</h1>
                        <span className="bg-bg px-4 py-1 rounded-full text-[white]">{pack.category}</span>

                        </div>
                        <div>
                            <h1 className="text-[grey]">{pack.location}</h1>
                        </div>

                        <div>
                        <h1 className="mt-8 font-medium">Short Description</h1>
                            <p className="text-[grey] mt-2">{pack.shortDescription}</p>
                        </div>


                        <div>
                        <h1 className="mt-8 mb-8 font-medium">Description</h1>
                        <h2>{pack.descriptionTitle}</h2>
                            <p className="text-[grey] mt-2 whitespace-pre-wrap">{pack.description}</p>
                        </div>
                        

                        <div className="text-lg my-4 text-[grey]">
                            <h1><span className="font-bold text-[#414141]">{pack.shortDuration}</span>  -  {pack.duration}</h1>
                        </div>


                        {pack.price && <div className="text-2xl font-bold bg-[#e2e2e2] p-2 rounded">
                            <h1><span className="mr-1">₹</span><span>{pack.price.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</span><span className="font-normal text-[grey] text-sm ml-2">Per Person</span></h1>
                         </div>}




                        {pack.titleImage && 
                       <div className="flex items-streatch gap-[5%]">
                         <div className="w-[30%] my-8 bg-[#e2e2e2] p-2 rounded">
                            <h1 className="mb-4 font-medium">Title Image</h1>
                            <img src={pack.titleImage} alt="" />
                        </div>
                        <div className="w-[65%]  my-8 bg-[#e2e2e2] p-2 rounded">
                        <h1 className="mb-4 font-medium">Package Card Tags</h1>
                        <ul>
                            {pack.cardTags.cardTag1 && <li className="flex items-start gap-2"><img src="/images/icons/tick.png" className="w-6" alt="" />{pack.cardTags.cardTag1}</li>}
                            {pack.cardTags.cardTag2 && <li className="flex items-start gap-2"><img src="/images/icons/tick.png" className="w-6" alt="" />{pack.cardTags.cardTag2}</li>}

                        </ul>

                        </div>
                       </div>
                        }
                        {pack.images && pack.images.length >0 && <div className=" my-8 bg-[#e2e2e2] p-2 rounded"> 
                        <h1 className="mb-4 font-medium">Images</h1>
                        <div className="flex flex-wrap gap-[5%]">
                        {pack.images?.map((item,index)=>(
                                <img src={item} alt="" key={index} className="w-[30%] mb-8 aspect-video skeleton" />
                            ))}
                        </div>
                            
                        </div>}

                        {pack.locationTags && pack.locationTags.length >0 && <div className=" my-8 bg-[#e2e2e2] p-2 rounded"> 
                        <h1 className="mb-4 font-medium">Location Tags</h1>
                        <div className="flex flex-wrap gap-[5%]">
                        {pack.locationTags?.map((item,index)=>(
                            <div className="bg-bg text-[white] font-bold gap-4 rounded overflow-hidden pr-4  flex items-center">
                                <img src={item.img} alt="" className="w-[100px] skeleton aspect-video"/> <h1>{capitaliseFirstLetter(item.location)}</h1>
                            </div>
                            ))}
                        </div>



                       
                            
                        </div>}
                        <div className=" my-8 bg-[#e2e2e2] p-2 rounded">
                        <h1 className="mb-4 font-medium">Schedule </h1>

                        <div>
                            {pack.schedule && pack.schedule.map((item,index)=>(
                                <div className="bg-[white] mb-2 rounded p-2">
                                    <h1 className="font-bold"><span className="text-[green] ">Day {index+1}</span> - {item.dayTitle}</h1>
                                    <p className="text-[grey]">{item.dayDesc}</p>
                                </div>
                            ))}
                        </div>

                        </div>







                        <div className=" my-8 bg-[#e2e2e2] p-2 rounded">
                        <h1 className="mb-4 font-medium">Activities </h1>

                        <div>
                            {pack.activities && pack.activities.map((item,index)=>(
                                <div className="bg-[white] mb-2 rounded p-2 flex gap-[5%]">
                                    <div className="w-[15%]">
                                        <img src={item.img} alt="" className="w-full" />
                                    </div>
                                    <div className="w-[80%]">
                                        <h1 className="font-bold">{item.title}</h1>
                                        <p className="text-[grey] text-sm">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        </div>




                        <div className=" my-8 bg-[#e2e2e2] p-2 rounded">
                        <h1 className="mb-4 font-medium">Places to visit </h1>

                        <div>
                            {pack.places && pack.places.map((item,index)=>(
                                <div className="bg-[white] mb-2 rounded p-2 flex gap-[5%]">
                                    <div className="w-[15%]">
                                        <img src={item.img} alt="" className="w-full" />
                                    </div>
                                    <div className="w-[80%]">
                                        <h1 className="font-bold">{item.place}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>

                        </div>


                        <div className=" my-8 bg-[#e2e2e2] p-2 rounded">
                        <h1 className="mb-4 font-medium">Inclusions </h1>

                        <div>
                            {pack.inclusions && pack.inclusions.map((item,index)=>(
                                <div key={index}>
                                    <ul>
                                        <li className="bg-[white] px-2 py-1 rounded mb-2">{item}</li>
                                    </ul>
                                </div>
                            ))}
                        </div>

                        </div>




                        <div className=" my-8 bg-[#e2e2e2] p-2 rounded">
                        <h1 className="mb-4 font-medium">Exclusions </h1>

                        <div>
                            {pack.exclusions && pack.exclusions.map((item,index)=>(
                                <div key={index}>
                                    <ul>
                                        <li className="bg-[white] px-2 py-1 rounded">{item}</li>
                                    </ul>
                                </div>
                            ))}
                        </div>

                        </div>









                    </div>
                        )
                    }
                  
                 
                </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Package