import React from 'react'
import { FaCode } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

const EditorNavbar = ({theme , setTheme}) => {
  return (

    <div className={` ${theme ? 'bg-[#141414] ': 'bg-gray-200'}  px-[10px] h-[80px] md:px-[100px] flex items-center justify-between`}>

    <div className='flex items-center gap-4 '>
      <FaCode className='md:text-6xl text-4xl bg-sky-400 rounded-full p-[6px]'/>
       <h1 className='md:text-3xl text-xl font-bold'>CODE NEXUS</h1>
    </div>

    <div>
        <h2 className='font-bold'>File/ <span className='font-semibold text-gray-400 '>My first project</span> </h2>
    </div>

    <div>
       <FiDownload className={`cursor-pointer text-xl ${theme? 'text-white' : 'text-gray-400'} `} />
    </div>

    </div>
  )
}

export default EditorNavbar