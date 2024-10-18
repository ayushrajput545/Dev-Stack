import React from 'react'
import { LiaFreeCodeCamp } from "react-icons/lia";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';


const EditorNavbar = ({theme , setTheme , items}) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);


  function clickHandler(){

    if(!isLoggedIn){
      navigate('/login');
      toast('Login required');
    }
    else{
      navigate('/');
    }



  }
  return (

    <div className={` ${theme? ' bg-gradient-to-br from-[#142c37] to-[#0D0C0C]' : 'bg-gray-200'}  px-[10px] h-[80px] md:px-[50px]  flex items-center justify-between`}>

      <div className='flex items-center gap-2 '>
        <LiaFreeCodeCamp  className='md:text-6xl text-5xl bg-teal-400 rounded-full p-[6px]'/>
        <h1 className={` md:text-3xl text-2xl font-bold ${theme? 'text-white' : 'text-gray-600'}`}>DEV STACK</h1>
      </div>

       <div className={`${theme? 'text-white' : 'text-gray-600'} md:mr-16`}>
        {
          items ?
           <h2 className='font-bold  mx-6'>File/ <span className='font-semibold text-gray-400 '>{items.title}</span> </h2>
           :
           <button onClick={clickHandler}  className='bg-teal-400 rounded-md w-12 text-3xl pb-2'>+</button>
        }
        
      </div>

     <div >
      {
        theme ?  <MdLightMode onClick={()=>setTheme(!theme)} className='cursor-pointer text-3xl' /> :
               <MdDarkMode onClick={()=>setTheme(!theme)} className='cursor-pointer text-4xl text-gray-600'/>
      }
      
     </div>

    </div>
  )
}

export default EditorNavbar