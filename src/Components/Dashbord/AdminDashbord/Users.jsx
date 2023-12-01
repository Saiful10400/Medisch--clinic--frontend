import {  useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { GiQueenCrown } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { dataProvider } from "../../Context Api/DataProvider";
import Swal from "sweetalert2";

const Users = () => {
  // const [users, setUsers] = useState([]);
  // const[load,setload]=useState(true)
  const axiosPublic = useAxiosPublic();
  const{user}=useContext(dataProvider)




  // useEffect(() => {
  //   axiosPublic.get("/get_users").then((res) => setUsers(res.data));
  // }, [axiosPublic,load]);
 
// this code replacement with transtak query.


const{data:users=[],refetch}=useQuery({
  queryKey:['users'],
  queryFn:async()=>{
    const res=await axiosPublic.get(`/get_users?email=${user.email}`,{withCredentials:true})
    return res.data
  }
})

 


  // modal handle.
  const [modalData, setModalData] = useState(null);
  const modalHandle = (data) => {
    setModalData(data);
    document.getElementById("my_modal_3").showModal();
  };

//   user activity handle.

const activityHandle=(userData)=>{

console.log(userData)
    Swal.fire({
      title: "Are you sure?",
      text: userData.status==="active" ? `block ${userData.name}.` : `Unblock ${userData.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {


        let status=null
        if(userData.status==="active"){
            status="block"
        }
        else if(userData.status==="block"){
            status="active"
        }
    
        axiosPublic.patch("/update_user",{email:userData.email,status})
        .then(()=>{
          refetch()
          Swal.fire({
            title: "Done!",
            text: "",
            icon: "success"
          });
        })
  
      }
    });
}

// role handle.

const roleHandle=(item)=>{

if(item.email.toUpperCase()!==user.email.toUpperCase() && item.role!=="admin"){
  // change the role.



  Swal.fire({
    title: "Are you sure?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes!"
  }).then((result) => {
    if (result.isConfirmed) {


      axiosPublic.patch("/role_update",{email:item.email})
      .then(res=>{
        console.log(res.data)
        refetch()
        Swal.fire({
          title: "Promoted!",
          text: "",
          icon: "success"
        });
      })
      
    }
  });


  
}
}
const[newdata,setnewdata]=useState([])
// pagination logics.
const elements=[]
const userlangth=users.length
const loopwillrun=Math.ceil(userlangth/5)
for(let i=1;i<=loopwillrun;i++){
  elements.push(i)
}

// 

  return (
    <div className="w-[100vw] lg:w-[60vw] mx-auto">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Address & contact</th>
              <th>Blood goup</th>
              <th>Status</th>
              <th>Role</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {newdata.map((item, idx) => (
              <tr key={idx}>
                <td>{++idx}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.photoUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      {/* <div className="text-sm opacity-50">{item.role}</div> */}
                    </div>
                  </div>
                </td>
                <td>
                  {item.email}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {`${item.upazila} , ${item.district}`}
                  </span>
                </td>
                <td>{item.bloodGroup}</td>
                <td><button onClick={()=>activityHandle(item)} className={` btn btn-sm text-white  ${item.status==="active" ? "btn-success" : "btn-error"}`}>{item.status}</button></td>
                <td><button onClick={()=>roleHandle(item)} className={`btn  btn-sm lg:text-md  text-[11px]  ${item.role==="admin"?"btn-warning":"btn-primary"}`}>{item.role==="admin"?<GiQueenCrown />:<FaRegUser />}{item.role}</button></td>
                <th>
                  <button
                    onClick={() => modalHandle(item)}
                    className="btn btn-ghost btn-xs"
                  >
                    see info
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
            <th></th>
              <th>Name</th>
              <th>Address & contact</th>
              <th>Blood goup</th>
              <th>Status</th>
              <th>Role</th>
              <th>Details</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Name</td>
                  <td className="font-bold text-black text-lg">{modalData?.name}</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>E-mail</td>
                  <td className="font-bold text-black text-lg">{modalData?.email}</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Login Password</td>
                  <td className="font-bold text-black text-lg">{modalData?.password}</td>
                </tr>
                <tr>
                  <th>4</th>
                  <td>Blood Group</td>
                  <td className="font-bold text-black text-lg">{modalData?.bloodGroup}</td>
                </tr>
                <tr>
                  <th>5</th>
                  <td>District</td>
                  <td className="font-bold text-black text-lg">{modalData?.district}</td>
                </tr>
                <tr>
                  <th>6</th>
                  <td>Upazila</td>
                  <td className="font-bold text-black text-lg">{modalData?.upazila}</td>
                </tr>
                <tr>
                  <th>7</th>
                  <td>Role</td>
                  <td className="font-bold text-black text-lg">{modalData?.role}</td>
                </tr>
                <tr>
                  <th>8</th>
                  <td>Status</td>
                  <td className="font-bold text-black text-lg">{modalData?.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
      {/* pagination. */}
      <div className="flex justify-center items-center gap-5 py-5">
        {
          elements.map(item=><div key={item}>
            <button onClick={()=>console.log(users.slice(0,5))} className="btn btn-primary">{item}</button>
          </div>)
        }
      </div>
    </div>
  );
};

export default Users;
