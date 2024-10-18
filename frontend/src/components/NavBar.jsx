import React, { useState } from 'react'
import { LiaFreeCodeCamp } from "react-icons/lia";
import { Link, useNavigate } from 'react-router-dom';
import Avtaar from 'react-avatar'
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { MdLightMode } from "react-icons/md";
import { TbLayoutGridFilled } from "react-icons/tb";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from './redux/auth';

const NavBar = ({menu , setMenu ,setGridLayout ,gridLayout , setTheme, theme,projectData}) => {

  const [showtoggleMenu , setShowToggleMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Tailwind's 'md' breakpoint
        setMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function logoutHandler(){

    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate('/login');

  }

  



  return (
    <div className={` ${theme? 'bg-gray-200' : ' bg-gradient-to-br from-[#142c37] to-[#0D0C0C] '} w-screen px-[10px] h-[80px] md:px-[100px] flex items-center justify-between`}>

          <div className='flex items-center gap-2 '>
             <LiaFreeCodeCamp  className='md:text-6xl text-5xl bg-teal-400 rounded-full p-[6px]'/>
             <h1 className={` md:text-3xl text-2xl font-bold ${theme? 'text-gray-600' : 'text-white'}`}>DEV STACK</h1>
           </div>

        {
        menu &&
        <div className='block md:hidden fixed top-0 left-0 bg-gray-900 opacity-80 h-screen w-full'></div>
        }

       {
        showtoggleMenu &&
        <div className='  fixed top-0 md:top-4 right-0  bg-gradient-to-br from-[#142c37] to-[#0D0C0C] md:border border-teal-400 opacity-80 h-screen md:h-3/6 w-full md:w-2/6 lg:w-1/6 rounded-lg'></div>
       } 

      
       <div  className={`flex flex-row items-center absolute right-5  top-5 ${menu&& 'flex-col gap-5 '}`}>

        <div className='block md:hidden text-xl '>
         {menu ? <RxCross2  onClick={()=> setMenu(!menu)} /> :<GiHamburgerMenu onClick={()=>setMenu(!menu)} className={`${showtoggleMenu? 'hidden' : 'block'} ${theme && 'text-gray-600'} ` }/>} 
        </div>

        {  
       
          showtoggleMenu  ? <RxCross2 className='text-2xl cursor-pointer block md:hidden' onClick={()=> setShowToggleMenu(!showtoggleMenu)}/> :
           projectData &&
          <Avtaar name={projectData.username} size='40' round='50%' onClick={()=>setShowToggleMenu(!showtoggleMenu)}  className={`relative cursor-pointer  ml-2 md:hidden block ${menu&& 'hidden'} ${showtoggleMenu&&'hidden'}`}></Avtaar>
        }
      
       
      

        { 
         showtoggleMenu ? <RxCross2 className='text-2xl hidden md:block' onClick={()=> setShowToggleMenu(!showtoggleMenu)}/> :
        
         <div className={` md:flex  md:flex-row gap-4 items-center ${menu ? 'absolute right-24 top-14 flex flex-col':'hidden'} ${theme?  `${menu ? 'text-white':'text-gray-600'}` :'text-white'}`}>
        
          <Link>Home</Link>
          <Link>About</Link>
          <Link>Contact</Link>
          <Link>Services</Link>   
          {
            projectData &&
             <Avtaar name={projectData.username} size='40' round='50%' onClick={()=>setShowToggleMenu(!showtoggleMenu)} className={`cursor-pointer mr-5 ml-2 hidden md:block `}></Avtaar>
          }
         
                   
         </div>    
       }
      

       <div className={`absolute right-[15px] top-[80px] w-[150px] h-[150px] p-[10px] py-[14px] shadow-lg ${showtoggleMenu?'block' :'hidden'} `}>

       {
        projectData &&
         <h2>{projectData.username}</h2>
       }
        
         <div className='w-full bg-white h-[1px] my-4'></div>

         <div className='flex items-center gap-2 my-2'>
          <MdLightMode />
          {
            theme ? 
            <h2 onClick={()=>{setTheme(false); setShowToggleMenu(!showtoggleMenu)}} className='cursor-pointer'>Dark mode</h2>
            :
            <h2 onClick={()=>{setTheme(true); setShowToggleMenu(!showtoggleMenu)}} className='cursor-pointer'>Light mode</h2>
          }
          
         </div>

        
         <div className='flex items-center gap-2 cursor-pointer'>
             <TbLayoutGridFilled />
          {
            gridLayout ? 
           
             <h2 onClick={()=> {setGridLayout(false); setShowToggleMenu(!showtoggleMenu)}} >List layout</h2>
             :
             <h2 onClick={()=> {setGridLayout(true); setShowToggleMenu(!showtoggleMenu)}}>Grid layout</h2>
          }
         
          
         </div>

         <div>
          <button onClick={logoutHandler} className='bg-gray-600 px-4 py-2 rounded-md my-4'>Log Out</button>
         </div>

       </div>


       </div>


    </div>
  )
}

export default NavBar