import React, { useState } from 'react'
import EditorNavbar from '../components/EditorNavbar'
import Editor from '@monaco-editor/react'
import { MdLightMode } from "react-icons/md";
import { FaExpandAlt } from "react-icons/fa";

const Editoor = () => {

  const[theme , setTheme] = useState('dark');

  function modeHandler(){
    setTheme(!theme);
  }


  return (
    <>
        <EditorNavbar theme={theme} setTheme={setTheme} />

 {/* Editor parent div */}
        <div className='flex  '>

 {/*  Editor left div*/}
          
          <div className='flex flex-col w-1/2'>


            <div className={`flex items-center justify-between p-[10px] ${theme ? 'bg-[#1A1919] ' : 'bg-gray-200 text-black'} `}>
              <div className='flex ml-6 items-center gap-5'>
                <div className='p-[6px] bg-gray-400 px-[10px] text-[15px] '>HTML</div>
                <div className='p-[6px] bg-gray-400 px-[10px] text-[15px] '>CSS</div>
                <div className='p-[6px] bg-gray-400  px-[10px] text-[15px] '>JAVASCRIPT</div>
              </div>

              <div className='flex gap-4'>
                <MdLightMode onClick={modeHandler} className='cursor-pointer text-xl' />
                <FaExpandAlt className='cursor-pointer text-xl' />
              </div>
                
            </div>

            <Editor  defaultLanguage='javascript' defaultValue='//some comment' theme={theme ? 'vs-dark' : 'vs-light'} height='82vh'/>

            <div>

            </div>

          </div>

   {/* Editor right div/iframe --> for displaying content like videos, maps, or other web pages within your own page. */}
 
          <iframe src="" frameborder="0" className='w-1/2 bg-white min-h-[82vh]  text-black'></iframe>
            

        </div>

    </>
  )
}

export default Editoor