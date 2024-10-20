import React, { useState } from 'react'
import { LiaFreeCodeCamp } from "react-icons/lia";
import loginimg from '../assets/login-image.jpg'
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch , useSelector} from 'react-redux';
import { authActions } from '../components/redux/auth';
import useCode from '../components/useCode';
import Spinner from '../components/Spinner';

const Login = () => {

  const[Data , setData] = useState({username:"" , name:'' , email:'' , password:''});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const{loader,setLoader} = useCode(); // custom hook
  
  if(isLoggedIn){
    navigate('/');
  }

  const changeHandler =(event)=>{
    const{name , value} = event.target;
    setData((prev)=>{
      return{
        ...prev,
        [name] : value
    }
    })
  }

 async function submitHandler(event){
    // event.preventDefault();
    // console.log(Data);
      
    try{

      if(!Data.username || !Data.password){
        toast.error("All fields are required");
      }
      else{
        setLoader(true);
        const response = await axios.post('https://online-code-editor-tfye.onrender.com/api/v1/login', Data);
        // console.log(response);
        setLoader(false);
        setData({username:"" , password:""});
        localStorage.setItem("id" , response.data.id);
        localStorage.setItem("token", response.data.token);
        navigate('/'); 
        dispatch(authActions.login());  
           
      }

    }

    catch(err){
      console.log(err);
      toast.error(err.response.data.message);
      setData({username:"" , password:""});
      navigate('/signup')
    }
  }




  return (
    
    <>
      <div className='absolute top-8 '>
        <button onClick={()=>navigate('/editor')} className='md:text-2xl text-xl font-semibold bg-gray-600 py-2 px-3 rounded-lg ml-14 font-mono border border-teal-400'>Start Coding →</button>
      </div>

      {
        loader ? <Spinner/> :

             
      <div className='w-screen  min-h-screen flex items-center justify-center bg-gradient-to-br from-[#142c37] to-[#0D0C0C]'>

        {/* This div contain left and right divs */}
        <div className='lg:w-5/6  lg:h-[90vh] w-screen h-[650px]  flex'>

         {/* left div */}
         <div className='md:w-1/2 md:h-full w-screen h-full   flex flex-col justify-center px-14  '>

          <div className='flex items-center gap-2 '>
             <LiaFreeCodeCamp  className='md:text-6xl text-5xl bg-teal-400 rounded-full p-[6px]'/>
             <h1 className='md:text-3xl text-2xl font-bold'>DEV STACK</h1>
           </div>

           <div className='flex flex-col gap-6 my-6'>
            <input required type="text" placeholder='Username' name='username' onChange={changeHandler} value={Data.username} className='p-3 rounded outline-none bg-gray-800'/>
            <input required type="text" placeholder='Password' name='password' onChange={changeHandler} value={Data.password} className='p-3 rounded outline-none bg-gray-800'/>
           </div>

           <div className='my-3'>
            <button className='bg-teal-400 w-full py-3 rounded text-xl' onClick={submitHandler}>Login</button>
           </div>

           <div className='w-full text-center'>Don't have an account ?  <Link to='/signup'>Signup here</Link> </div>


         </div>
      
      {/* right div  */}
         <div className='md:w-1/2 md:h-full hidden md:block  py-11'>

         <img src={loginimg} alt="" className='w-full h-full rounded-lg'/>

         </div>


        </div>


      </div>
       
      }
     
     
      </>


    
  )
}

export default Login