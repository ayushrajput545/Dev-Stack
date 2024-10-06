import React, { useEffect, useState } from 'react'
import EditorNavbar from '../components/EditorNavbar'
import Editor from '@monaco-editor/react'
import { MdLightMode } from "react-icons/md";
import { FaExpandAlt } from "react-icons/fa";

const Editoor = () => {

  const[theme , setTheme] = useState('dark');
  const [expanded , setExpanded] = useState(false);
  const [tab , setTab] = useState('html');
  const[htmlCode , sethtmlCode] = useState("<h1> Hello World </h1>");
  const[cssCode , setCssCode] = useState(".is{background-color:red}");
  const[jsCode , setJsCode] = useState("//some comment");

  function run(){

    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;
    const iframe = document.getElementById('iframe');
    iframe.srcdoc = html + css + js;
  }

  useEffect(()=>{
    
      run();
     
     
  },[htmlCode , cssCode , jsCode])

  


  return (
    <>
        <EditorNavbar theme={theme} setTheme={setTheme} />

 {/* Editor parent div */}
        <div className='flex  '>

 {/*  Editor left div*/}
          
          <div className={`flex flex-col ${expanded ? 'w-full' : 'w-1/2'} `}>


            <div className={`flex items-center justify-between p-[10px] ${theme ? 'bg-[#1A1919] ' : 'bg-gray-200 text-black'} `}>
              <div className='flex ml-6 items-center gap-5'>
                <div onClick={()=>setTab('html')} className='p-[6px]  cursor-pointer bg-gray-400 px-[10px] text-[15px] '>HTML</div>
                <div onClick={()=>setTab('css')} className='p-[6px] cursor-pointer bg-gray-400 px-[10px] text-[15px] '>CSS</div>
                <div onClick={()=>setTab('javascript')} className='p-[6px] cursor-pointer bg-gray-400  px-[10px] text-[15px] '>JAVASCRIPT</div>
              </div>

              <div className='flex gap-4'>
                <MdLightMode onClick={()=>setTheme(!theme)} className='cursor-pointer text-xl' />
                <FaExpandAlt onClick={()=>setExpanded(!expanded)} className='cursor-pointer text-xl' />
              </div>
                
            </div>

            {/* setting tabs  */}
            
            {
              tab=='html'?
              <div>
                 <Editor onChange={(value)=>{sethtmlCode(value); run()}} language='html' value={htmlCode} theme={theme ? 'vs-dark' : 'vs-light'} height='82vh'/>
              </div>
              :
              tab=='css'?
              <div>
                 <Editor  onChange={(value)=>{setCssCode(value); run()}} language='css' value={cssCode} theme={theme ? 'vs-dark' : 'vs-light'} height='82vh'/>
              </div>
              :
              <div>
                 <Editor  onChange={(value)=>{setJsCode(value); run()}} language='javascript' value= {jsCode} theme={theme ? 'vs-dark' : 'vs-light'} height='82vh'/>
              </div>

            }

            <div>

            </div>

          </div>

   {/* Editor right div/iframe --> for displaying content like videos, maps, or other web pages within your own page. */}
 
          <iframe id='iframe'  frameborder="0" className= {`${expanded ? 'hidden' : 'block'} w-1/2 bg-white min-h-[82vh]  text-black`} ></iframe>
            

        </div>

    </>
  )
}

export default Editoor