import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CodeEditor from "./CodeEditor"

type projectDataType = {
    title:string,
    description:string,
    tags:string[],
    code:[],
    explanation:string,
    imageLink:string,
    githubLink:string,
    demoLink:string,
    _id:string
}

type codeType =  {
   react?:string,
   css?:string,
   js?:string,
   ts?:string,
   html ?:string,
}[]

export default function Code() {
    const {id} = useParams()

    const [codes , setCodes] = useState<codeType>([])

    useEffect(()=>{
       const  singleProject = async () => {
         const response = await axios.post(`http://localhost:3000/user/project/${id}`,{
            id
         },{
             headers:{
                'Content-Type':'application/json',
                'Authorization':'bearer ' + localStorage.getItem('token'),
             }
         })
         const project:projectDataType = response.data.project
         
         setCodes(project.code)
        
         

       }
       singleProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const [showCode,setShowCode] = useState<string>('')
    const [codeValue , setCodeValue] = useState<string[]>([''])
    
    function codeHandler(e:React.MouseEvent<HTMLButtonElement>){
      setShowCode(e.currentTarget.innerText)
      const id =  Number(e.currentTarget.id)
      setCodeValue(Object.values(codes[id]))
       
    }

  return (
    <div className="code-wrapper">
           <div className="code-container">
                <h1 className="heading">Code</h1>
                <div className="code-box">
                    <div className="code-selector">
                      {
                        codes.map((code , i)=>{
                           return <button onClick={codeHandler} className="code-toggle subheading" id={String(i)}>{Object.keys(code)}</button>
                        })
                      }
                    </div>
                    <div className="code-editor-wrapper para">
                         <p className="subheading">{showCode}</p> 
                         <CodeEditor showCode={showCode} codeValue={codeValue}/>
                    </div>
                </div>
           </div>
    </div>
  )
}
