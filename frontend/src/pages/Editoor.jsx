import React, { useEffect, useState } from 'react'
import EditorNavbar from '../components/EditorNavbar'
import Editor from '@monaco-editor/react'
import { MdLightMode } from "react-icons/md";
import { FaExpandAlt } from "react-icons/fa";
import useCode from '../components/useCode';
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const Editoor = () => {

  const[theme , setTheme] = useState('dark');
  const [expanded , setExpanded] = useState(false);
  const [tab , setTab] = useState('html');
  

  const location = useLocation();
  const { items } = location.state || {};

  const [htmlCode, setHtmlCode] = useState(items?.htmlCode || '');
  const [cssCode, setCssCodeLocal] = useState(items?.cssCode || '');
  const [jsCode, setJsCodeLocal] = useState(items?.jsCode || '');

  function run(){

    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;
    const iframe = document.getElementById('iframe');
    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  }

  useEffect(()=>{
    
      run();
        
  },[htmlCode, cssCode, jsCode])



  useEffect(() => {
    document.body.style.backgroundColor =  theme ? '#0D0C0C' : 'white';
  },[theme]);

  useEffect(()=>{

    async function fetchCode(){
      try{
        
        const response = await axios.put(`http://localhost:3000/api/v1/updatecode/${items._id}`, {htmlCode:htmlCode , cssCode:cssCode , jsCode:jsCode});
        console.log(response);

      }
      catch(err){
        console.log(err);
        console.log(err.message)
      }
    }

    fetchCode();
  })

  


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
        items && 
         
        tab=='html'?
        <div>
            <Editor onChange={(value)=>{setHtmlCode(value); }} language='html' value={htmlCode} theme={theme ? 'vs-dark' : 'vs-light'} height='82vh'/>
        </div>
        :
        tab=='css'?
        <div>
            <Editor  onChange={(value)=>{setCssCodeLocal(value); }} language='css' value={cssCode} theme={theme ? 'vs-dark' : 'vs-light'} height='82vh'/>
        </div>
        :
        <div>
            <Editor  onChange={(value)=>{setJsCodeLocal(value); }} language='javascript' value= {jsCode} theme={theme ? 'vs-dark' : 'vs-light'} height='82vh'/>
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