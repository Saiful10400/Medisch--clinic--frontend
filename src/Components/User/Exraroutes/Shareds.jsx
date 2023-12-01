import React from 'react';

const Shareds = ({name,route}) => {
    return (
        <div className='relative'>
            <div className='absolute right-[10%] top-[30%]  '>
            <h1 className='lg:text-[36px] font-bold'>{name}</h1>
            <h1 className='lg:text-[30px] font-normal'>{route}</h1>
            </div>
            <img className='w-full' src="https://webstrot.com/html/medisch/medisch/images/breadcrumb.jpg" alt="" />
        </div>
    );
};

export default Shareds;