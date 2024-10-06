import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { FaSearch } from "react-icons/fa";
import GridCard from '../components/GridCard';
import ListCard from '../components/ListCard';
 

const Home = () => {

  const[menu , setMenu] = useState(false);
  const[gridLayout , setGridLayout] = useState(false);
  const[createProject , setCreateProject] = useState(false);

   
  return (
    <> 

        <NavBar menu={menu} setMenu={setMenu} />
        
        <div className={`px-[5px] md:px-[100px] my-8 flex justify-between items-center  }`}>

          <h2 className='text-md md:text-2xl '>Hi , Ayush <span className='text-lg md:text-4xl'>👋</span></h2>

          <div className='flex '>
            <input type="text" placeholder='Search' className='p-1 md:p-3 rounded-md outline-none bg-gray-800 w-[150px] md:w-[300px]' />
             <button onClick={()=>setCreateProject(true)} className='bg-sky-400 rounded-md w-12 text-3xl pb-2'>+</button>
          </div>

        </div>

        <div className="cards md:px-[100px] ">

           {
          gridLayout?
          <div className='flex flex-wrap items-center gap-4 justify-center lg:justify-normal'>
              <GridCard/>
              <GridCard/>
              <GridCard/>
              <GridCard/>
              <GridCard/>
              <GridCard/>
          </div>
        
          :
          
          <div>
            <ListCard/>
            <ListCard/>
            <ListCard/>
            <ListCard/>
            <ListCard/> 
          </div>
           
          
          
        }

        </div>

    {/* Create prject  */}

       {
        createProject &&
         <div className=' fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-screen flex items-center justify-center'>

          <div className='w-[400px] h-[250px] bg-[#141414] rounded-lg p-[20px] py-[20px] flex flex-col justify-between'>

            <h1 className='text-3xl font-semibold'>Create New Project</h1>
            <input type="text" placeholder='Enter project title' className='outline-none p-2 rounded bg-gray-800' />
            <div className='flex gap-2 items-center'>
              <input type="checkbox"/>
              <p>is Public</p>
            </div>
            <div className='flex justify-between items-center'>
             <button className='bg-sky-400 px-14 py-2 rounded text-xl '>Create</button>
             <button  onClick={()=>setCreateProject(false)} className='bg-gray-800 px-14 py-2 rounded text-xl'>Cancel</button>
           </div>

            
          </div>

        </div>
       }
       
       



    </>
  )
}

export default Home