import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../custom Hooks/useAxiosPublic';
import { dataProvider } from '../../../Context Api/DataProvider';
import Swal from 'sweetalert2';

const Myprifile = () => {

    const axiosPublic=useAxiosPublic()
    const[userData,setUser]=useState({})
    const{user}=useContext(dataProvider)
   
    const[reload,setreload]=useState(false)
    useEffect(()=>{
        if(user){
            console.log(user?.email)
           axiosPublic.post("/single_userdata",{email:user?.email},{withCredentials:true})
           .then(res=>{
            console.log(res.data)
            const newdata=res.data.find(item=>item.email.toUpperCase()===user?.email.toUpperCase())
            setUser(newdata)
           })
            
        }
    },[user,axiosPublic,reload])
    console.log({setuserdata:userData})

    // edit profile handele.
    let inputStyle =
    "w-[290px] lg:w-[460px] h-[40px] mb-3 py-[10px] px-[20px] text-base font-semibold bg-[#EBF5F5] focus:outline-none";

    const EditprofileHandle=()=>{
        document.getElementById('my_modal_3').showModal()

    }

    // update form handle

    const updateform=e=>{
        e.preventDefault()
        const form=e.target
        const name=form.name.value
        const bloodGorup=form.bloodGroup.value
        const upazila=form.upazila.value
        const district=form.district.value
        const id=userData?._id
        // console.log({name,bloodGorup,upazila,district})
        // console.log({name,bloodGorup,upazila,district})
        axiosPublic.patch("/single_userUpdate",{name,bloodGorup,upazila,district,id})
        .then(()=>{
            setreload(!reload)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your profile updated.",
                showConfirmButton: false,
                timer: 1500
              });
        })
    }
    return (
        <div className='lg:w-8/12 lg:mx-auto h-[90vh]'>
           <div className=' w-full  flex flex-col lg:flex-row gap-12 lg:gap-5 '>
            <div className=' lg:w-1/5  flex flex-col items-center gap-5'>
                <img className='w-[200px] h-[200px] rounded-full object-cover' src={userData?.photoUrl} alt="" />
                <button onClick={EditprofileHandle} className='btn btn-warning'>Edit profile</button>
            </div>
            <div className=' w-4/5   flex flex-col gap-4'>
                <div>
                    <h1 className='font-bold text-sm'>User ID:</h1>
                    <h1 className='font-bold text-lg'>{userData?._id}</h1>
                </div>
                <div>
                    <h1 className='font-bold text-sm'>User Name:</h1>
                    <h1 className='font-bold text-lg'>{userData?.name}</h1>
                </div>
                <div>
                    <h1 className='font-bold text-sm'>User E-mail:</h1>
                    <h1 className='font-bold text-lg'>{userData?.email}</h1>
                </div>
                <div>
                    <h1 className='font-bold text-sm'>User Role:</h1>
                    <h1 className='font-bold text-lg'>{userData?.role}</h1>
                </div>
                <div>
                    <h1 className='font-bold text-sm'>User Status:</h1>
                    <h1 className='font-bold text-lg'>{userData?.status}</h1>
                </div>
                <div>
                    <h1 className='font-bold text-sm'>User Blood group:</h1>
                    <h1 className='font-bold text-lg'>{userData?.bloodGroup}</h1>
                </div>
                <div>
                    <h1 className='font-bold text-sm'>User Address:</h1>
                    <h1 className='font-bold text-lg'>{userData?.upazila},{userData?.district}</h1>
                </div>
            </div>
           </div>


           {/* modal */}


           <dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <form onSubmit={updateform} className='text-center' action="">
        <input name='name' defaultValue={userData?.name} className={inputStyle} placeholder='User name' type="text" />
        <input name='bloodGroup' defaultValue={userData?.bloodGroup} className={inputStyle} placeholder='User BloodGroup' type="text" />
        <input name='upazila' defaultValue={userData?.upazila} className={inputStyle} placeholder='User Upazila' type="text" />
        <input name='district' defaultValue={userData?.district} className={inputStyle} placeholder='User District' type="text" />
        <button className='btn btn-primary'>Update</button>
    </form>
  </div>
</dialog>




        </div>
    );
};

export default Myprifile;