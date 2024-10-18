
import { useState } from "react";

 const useCode= ()=>{

  const[htmlCode , sethtmlCode] = useState("<h1> Hello Dev Stack <h1/>");
  const[cssCode , setCssCode] = useState("h1{color:red}");
  const[jsCode , setJsCode] = useState("//some comment");
  

  return{
    htmlCode,
    sethtmlCode,
    cssCode,
    setCssCode,
    jsCode,
    setJsCode,
   
  }
}

export default useCode