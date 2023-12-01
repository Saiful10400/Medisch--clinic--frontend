import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../custom Hooks/useAxiosPublic';
import { dataProvider } from '../../../Context Api/DataProvider';

const TestResult = () => {
    const axiosPublic=useAxiosPublic()
    const{user}=useContext(dataProvider)
    const[data,setData]=useState([])
    useEffect(()=>{
        axiosPublic.get(`/booked_data?email=${user?.email}`)
        .then(res=>{
            const filteredData=res.data.filter(item=>item.report!==null)
            setData(filteredData)
        })
    },[user,axiosPublic])
    return (
        <div className="w-[100vw] lg:w-[30vw] mx-auto">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  
                </th>
                <th>Test</th>
                <th>Payment</th>
                
                 
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
                      
                    </div>
                  </td>
                  <td>
                   {item.name}
                  </td>
                  <td>
                   <a href={item.report? item.report : ""}><button className='btn btn-success btn-sm text-white'>Download</button></a>
                  </td>
                    
                </tr>)
              }
              
            </tbody>
            {/* foot */}
             
          </table>
        </div>
      </div>
    );
};

export default TestResult;