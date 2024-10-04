import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { FaSearch } from "react-icons/fa";
import GridCard from '../components/GridCard';
import ListCard from '../components/ListCard';
 

const Home = () => {

  const[menu , setMenu] = useState(false);
  const[gridLayout , setGridLayout] = useState(false);

   
  return (
    <div> 

        <NavBar menu={menu} setMenu={setMenu} />
        
        <div className={`px-[5px] md:px-[100px] my-8 flex justify-between items-center  }`}>

          <h2 className='text-md md:text-2xl '>Hi , Ayush <span className='text-lg md:text-4xl'>👋</span></h2>

          <div className='flex '>
            <input type="text" placeholder='Search' className='p-1 md:p-3 rounded-md outline-none bg-gray-800 w-[150px] md:w-[300px]' />
             <button className='bg-sky-400 rounded-md w-12 text-3xl pb-2'>+</button>
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
       



    </div>
  )
}

export default Home