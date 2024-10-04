import React, { useState } from 'react'
import { FaCode } from "react-icons/fa";
import loginimg from '../assets/login-image.jpg'
import {Link} from 'react-router-dom'

const Login = () => {

  const[Data , setData] = useState({username:"" , name:'' , email:'' , password:''});

  const changeHandler =(event)=>{
    const{name , value} = event.target;
    setData((prev)=>{
      return{
        ...prev,
        [name] : value
    }
    })
  }

  function submitHandler(event){
    event.preventDefault();
    // console.log(Data);
  }




  return (
    
         //Parent div
      <div className='w-screen  min-h-screen flex items-center justify-center '>

        {/* This div contain left and right divs */}
        <div className='lg:w-5/6  lg:h-[90vh] w-screen h-[650px]  flex'>

         {/* left div */}
         <div className='md:w-1/2 md:h-full w-screen h-full   flex flex-col justify-center px-14  '>

           <div className='flex items-center gap-2 '>
             <FaCode className='md:text-6xl text-5xl bg-sky-400 rounded-full p-[6px]'/>
             <h1 className='md:text-3xl text-2xl font-bold'>CODE NEXUS</h1>
           </div>

           <div className='flex flex-col gap-6 my-6'>
            <input required type="text" placeholder='Username' name='username' onChange={changeHandler} value={Data.username} className='p-3 rounded outline-none bg-gray-800'/>
            <input required type="text" placeholder='Password' name='password' onChange={changeHandler} value={Data.password} className='p-3 rounded outline-none bg-gray-800'/>
           </div>

           <div className='my-3'>
            <button className='bg-sky-400 w-full p-4 rounded text-xl' onClick={submitHandler}>Login</button>
           </div>

           <div className='w-full text-center'>Don't have an account ?  <Link to='/signup'>Signup here</Link> </div>


         </div>
      
      {/* right div  */}
         <div className='md:w-1/2 md:h-full hidden md:block  py-11'>

         <img src={loginimg} alt="" className='w-full h-full'/>

         </div>


        </div>


      </div>


    
  )
}

export default Login