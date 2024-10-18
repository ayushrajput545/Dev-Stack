import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { FaSearch } from "react-icons/fa";
import GridCard from '../components/GridCard';
import ListCard from '../components/ListCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import useCode from '../components/useCode';
 

const Home = () => {

  const[menu , setMenu] = useState(false);
  const[gridLayout , setGridLayout] = useState(false);
  const[createProject , setCreateProject] = useState(false);
  const [Data , setData]= useState({title:""});
  const[projectData , setProjectData] = useState();
  const[theme , setTheme] = useState(false);
  const{htmlCode , cssCode , jsCode } = useCode();  //custom hook
  
  
  useEffect(() => {
    document.body.style.backgroundColor = theme ? 'white' : '#142c37';
  },[theme]);
  

  const headers ={
    userid:localStorage.getItem("id"),
    authrization:localStorage.getItem("token")
  }

   

  function changeHandler(event){
    const{name, value} = event.target;
        setData((prev)=>{
          return{
            ...prev,
            [name]:value
          }
        })
  }

  async function createProjectHandler(){

    try{
      
      if(!Data.title){
        toast.error("Please fill the title");
      }
      else{
        const response = await axios.post('http://localhost:3000/api/v1/createProject',{title:Data.title, htmlCode,cssCode,jsCode}, {headers} );
        console.log(response);
        setCreateProject(false); 
      }

    }
    catch(err){
      console.log(err);
    }
  }

  

  useEffect(()=>{

    async function fetch (){
      try{
        const response = await axios.get('http://localhost:3000/api/v1/getAllprojects' ,{headers});
        // console.log(response);
        setProjectData(response.data.userDetails);
      }
      catch(err){
        console.log(err);
      }    
    }

      fetch(); 

  })

   
  return (
    <> 

        <NavBar  menu={menu} setMenu={setMenu} setGridLayout={setGridLayout} gridLayout={gridLayout} setTheme={setTheme} theme={theme} projectData={projectData}/>
        
        <div className={` px-[10px] md:px-[100px] my-8 flex justify-between items-center  }`}>

        { projectData &&
           <h2 className={`text-md md:text-2xl ${theme? 'text-gray-600':'text-white'}`}>Hi , {projectData.name} <span className='text-lg md:text-4xl'>👋</span></h2>
        }
         

          <div className='flex '>
            <input type="text" placeholder='Search' className={`p-1 md:p-3 rounded-md outline-none   w-[150px] md:w-[300px] ${theme ? 'bg-gray-200' :'bg-gray-900'}`} />
             <button onClick={()=>setCreateProject(true)} className='bg-teal-400 rounded-md w-12 text-3xl pb-2'>+</button>
          </div>

        </div>

     
    

       <div className="cards md:px-[100px] ">

           {
          gridLayout?
          <div className='flex flex-wrap items-center gap-4 justify-center lg:justify-normal'>
              <GridCard projectData={projectData.projects} theme={theme}  setCreateProject={setCreateProject}/>
               
          </div>
        
          :
          
        
          <div className='px-[10px]'>
            {
              projectData &&
              <ListCard projectData={projectData.projects} setCreateProject={setCreateProject} theme={theme}/>        
            }   
          </div>
           
          
          
        }

        </div>

 

    {/* Create prject  */}

       {
        createProject &&
         <div className=' fixed top-0 left-0  bg-gray-800 opacity-80 h-screen w-screen flex items-center justify-center'>

          <div className='md:w-[400px] w-[300px]  h-[250px] border border-teal-400 bg-gradient-to-br from-[#1b3d4d] to-[#0D0C0C] rounded-lg p-[20px] py-[20px] flex flex-col justify-between'>

            <h1 className='text-3xl font-semibold'>Create New Project</h1>
            <input type="text" placeholder='Enter project title' name='title' value={Data.value} onChange={changeHandler} className='outline-none p-2 rounded bg-gray-700' />
            <div className='flex gap-2 items-center'>
              <input type="checkbox"/>
              <p>is Public</p>
            </div>
            <div className='flex gap-2 justify-between items-center'>
             <button onClick={createProjectHandler} className='bg-teal-400 text-center   px-8 md:px-14 py-2 rounded text-xl '>Create</button>
             <button  onClick={()=>setCreateProject(false)} className='bg-gray-700  px-8 md:px-14 py-2 rounded text-xl'>Cancel</button>
           </div>

            
          </div>

        </div>
       }
       
       



    </>
  )
}

export default Home