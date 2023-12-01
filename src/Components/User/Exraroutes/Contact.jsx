import React from 'react';
import Shareds from './Shareds';
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const Contact = () => {
    return (
        <div >
            <Shareds name={"Contacts"} route={"Home / Contacts"}></Shareds>
            <div className='lg:w-[1400px] mx-auto flex flex-col lg:flex-row gap-6 my-10 lg:my-32'>
                <div className='lg:w-[30%] flex-col flex gap-4'>

                    <div className='bg-[#ebf5f5] flex items-center gap-9 px-5 rounded-lg py-2'>
                        <div className='text-3xl text-red-500'><FaPhone/></div>
                        <div>
                            <h1 className='font-bold text-3xl'>Phone</h1>
                            <h1 className='font-normal text-lg'>+80 (234) 123 567 12</h1>
                        </div>
                    </div>
                    <div className='bg-[#ebf5f5] flex items-center gap-9 px-5 rounded-lg py-2'>
                        <div className='text-3xl text-red-500'><MdOutlineMailOutline /></div>
                        <div>
                            <h1 className='font-bold text-3xl'>Email</h1>
                            <h1 className='font-normal text-lg'>healthcare@example.com</h1>
                        </div>
                    </div>
                    <div className='bg-[#ebf5f5] flex items-center gap-9 px-5 rounded-lg py-2'>
                        <div className='text-3xl text-red-500'><CiLocationOn /></div>
                        <div>
                            <h1 className='font-bold text-3xl'>Address</h1>
                            <h1 className='font-normal text-lg'>121 Waldeck Street NY, USA</h1>
                        </div>
                    </div>

                </div>
            
                <div className='lg:w-[70%] bg-[#ebf5f5] pb-4'>
                    <h1 className='text-xl font-bold text-white bg-red-600'>Leave a Message</h1>
                    <div className='flex gap-5 px-4 my-14'>
                        <input className='w-1/2 h-[40px] text-md px-2 focus:outline-none  rounded-lg' type="text" placeholder='Your naem.' />
                        <input className='w-1/2 h-[40px] text-md px-2 focus:outline-none  rounded-lg' type="email" placeholder='Your email.' />
                    </div>
                    <textarea className='w-[80%] mx-auto block  h-[140px] mb-3' placeholder='Your message here.'></textarea>
                    <div className='flex gap-5 text-md px-4 mt-3 font-bold'>
                    <input type="checkbox" id='check' /><label htmlFor="check">By using this form you agree with the storage and handling of your data by this website Privacy Policy.</label>
                    </div>
                    <button className='btn   bg-red-600 border-none text-white rounded-full mt-10'>SEND MESSAGE</button>
                </div>
            </div>
        </div>
    );
};

export default Contact;