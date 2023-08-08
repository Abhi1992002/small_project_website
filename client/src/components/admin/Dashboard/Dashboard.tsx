import {useState } from "react"
import Basic from "./Basic"
import Explanation from "./Explanation"
import CodeDashboard from "./CodeDashboard"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function Dashboard() {

   const [title , setTitle] = useState<string>('') 
   const [description , setDescription] = useState<string>('') 
   const [imageLink , setImageLink] = useState<string>('') 
   const [githubLink , setGithubLink] = useState<string>('') 
   const [demoLink , setDemoLink] = useState<string>('') 
   const [tagString , setTagString] = useState<string>('') 
   const [tags , setTags] = useState<string[]>(null!)
   const [toggle , setToggle] = useState<string>('A') 
   const [code , setCode] = useState<object[]>([])
   const [explanation , setExplanation] = useState<string>('')

   const navigate = useNavigate()

   const createCourse = async() => {
      const response = await axios.post('https://small-project-website.onrender.com/admin/project',{
         title ,description,tags,code,githubLink,explanation,imageLink,demoLink
      },{
         headers:{
            'content-Type':'application/json',
            'Authorization':'bearer ' + localStorage.getItem('token')
          }
      })

      const message = response.data.message 

      alert(message)
      
      navigate('/')
   }

  return (
    <div className="dashboard-wrapper">
         <div className="sidebar-wrapper">
            <div className="sidebar-container">
                 <h1 className="heading text-center">Dashboard</h1>
                 <div className="button-wrapper-dashboard">
                    <button onClick={()=>setToggle('A')} className={toggle === 'A' ? 'btn clicked' : 'btn'}>Basic</button>
                    <button disabled className={toggle === 'B' ? 'btn clicked disabled' : 'btn disabled'}>Code</button>
                    <button disabled className={toggle === 'C' ? 'btn clicked disabled' : 'btn disabled'}>Explanation</button>
                
                 </div>
            </div>
         </div>
         <div className="dashboard-main-wrapper">
              <div className="dashboard-main-second-wrapper">
                  <div className="dashboard-main-container">

                     {toggle === 'A' &&   <Basic setTitle={setTitle} setDescription={setDescription} setImageLink={setImageLink} setTags={setTags} setGitHubLink={setGithubLink} setDemoLink={setDemoLink} toggle={setToggle} title={title} description={description} imageLink={imageLink} tags={tags} githubLink={githubLink} demoLink={demoLink} tagString={tagString} setTagString={setTagString}/>}

                     {toggle === 'B' && <Explanation toggle={setToggle} setExplanation={setExplanation} explanation={explanation}/>}

                     {toggle === 'C' && <CodeDashboard code={code} toggle={setToggle} createCourse={createCourse}  setCode={setCode}/>}
                     
                     {toggle === 'D' && <div style={{width:'100%',height:'100%',display:"flex",alignItems:"center",justifyContent:"center"}}> <button onClick={()=>createCourse()} className="btn explanation-btn">Submit</button></div>}
                   
                     
                  
                  </div>
              </div>
         </div>
    </div>
  )
}
