
import { useState } from "react";

 const useCode= ()=>{

  const[htmlCode , sethtmlCode] = useState(" HEllo ayushhhhh");
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