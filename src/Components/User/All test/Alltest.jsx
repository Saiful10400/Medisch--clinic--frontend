import { useEffect, useState } from "react";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";
import { Link } from "react-router-dom";



const Alltest = () => {
    const[data,setData]=useState([])
    const axiosPublic=useAxiosPublic()
    useEffect(()=>{
        axiosPublic.get("/get_test")
        .then(res=>{
            const Array=res.data
           const filteredArray= Array.filter(item=>{
                let given=item.date
                given=given.split("-")[1]+ "-" +given.split("-")[0]+"-"+given.split("-")[2]
                const date=new Date(given)
                const today=new Date()
                if(date>=today){
                    return true
                }
                if(date<today){
                    return false
                }
            })
            setData(filteredArray)

        })
    },[])
   

    // let given="06-12-2023"
    // given=given.split("-")[1]+ "-" +given.split("-")[0]+"-"+given.split("-")[2]
    // const date=new Date(given)
    // const today=new Date()
    // console.log(date<today)


// month + "-" + day + "-" + year

// search handel
const searchHandle=(e)=>{
    e.preventDefault()
    let searchDate=e.target.date.value
    searchDate=searchDate.split("-")[1]+"-"+searchDate.split("-")[2]+"-"+searchDate.split("-")[0]
    searchDate=new Date(searchDate)

    const filteredArray= data.filter(item=>{
        let given=item.date
        given=given.split("-")[1]+ "-" +given.split("-")[0]+"-"+given.split("-")[2]
        const date=new Date(given).getTime()
        const queryDate=new Date(searchDate).getTime()
        
        if(date===queryDate){
            return true
        }
        if(date!=queryDate){
            return false
        }
    })
    
   setData(filteredArray)

    
}
    return (
       <div>

        <div className="w-[1400px] mx-auto flex justify-center items-center my-4">
            <form onSubmit={searchHandle} className="border-2 p-2 border-gray-500">
            <input required name="date" className="" type="date" />
            <button className="btn ml-[30px] btn-secondary btn-sm">Search</button>
            </form>
        </div>





<div className="lg:w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
            {data?.map(item=><div key={item._id} className="card w-full bg-base-100 shadow-xl">
  <figure><img src={item.imageUrl} alt={item.testName} /></figure>
  <div className="card-body">
    <h2 className="card-title text-3xl">{item.testName}</h2>
    <p className="h-[70px] overflow-hidden text-lg font-medium">{item.details}</p>
    <div>
        <p className="text-lg font-bold">Price: {item.price} Tk</p>
        <p className="text-lg font-bold">Availabel slots: {item.slots}</p>
        <p className="text-lg font-bold">Last Date: {item.date}</p>
    </div>
    <div className="flex flex-col">
      <Link to={`/testDetails/${item._id}`} className="btn btn-primary">Details</Link>
    </div>
  </div>
</div>)}
        </div>
       </div>
    );
};

export default Alltest;

// /testDetails/