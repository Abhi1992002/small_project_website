import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

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

export default function Explanation() {
    const {id} = useParams()

    const [explanation , setExplanation] = useState<string>()

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
         
         setExplanation(project.explanation)
        
        
       }
       singleProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div className="explanation-wrapper">
         <div className="explanation-container">
            <h1 className="heading text-center">Explanation</h1>
            <div className="explanation-content-container">
            <p className="subheading">{explanation}</p>
            </div>
  
         </div>
    </div>
  )
}
