import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "./../../../custom Hooks/useAxiosPublic";
import { dataProvider } from "../../../Context Api/DataProvider";

const UpAppoinment = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(dataProvider);
  const [data, setData] = useState([]);
  const[reload,setreload]=useState(false)
  useEffect(() => {
    if (user) {
      axiosPublic
        .get(`/booked_data?email=${user.email}`)
        .then((res) => setData(res.data));
    }
  }, [user, axiosPublic,reload]);
   



//   const delete handel.
const cancelHandle=(item)=>{
    const id=item._id
    axiosPublic.post("/delete_item",{id})
    .then(res=>{
        console.log(res.data)
        setreload(!reload)
         
    })

}
  return (
    <div className="w-[100vw] lg:w-[60vw] mx-auto">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                
              </th>
              <th>Test</th>
              <th>Payment</th>
              <th>Last date</th>
              <th>Report Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map((item,idx)=><tr key={item._id}>
                <th>
                  {++idx}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.imgUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                       
                    </div>
                  </div>
                </td>
                <td>
                  Paid: {item.price-item.discount}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Transection Id: {item.transectionId}
                  </span>
                </td>
                <td>{item.date}</td>
                <td>{item.report? "Solved" :"Pending"}</td>
                 
                <th>
                  <button onClick={()=>cancelHandle(item)} className="btn btn-warning btn-xs">Cancel</button>
                </th>
              </tr>)
            }
            
          </tbody>
          {/* foot */}
           
        </table>
      </div>
    </div>
  );
};

export default UpAppoinment;
