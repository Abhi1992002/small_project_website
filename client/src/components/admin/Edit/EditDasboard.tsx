
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EditBasic from './EditBasic'
import EditExplanation from './EditExplanation'
import EditCode from './EditCode'

export default function EditDasboard() {
    const {id} =  useParams()
    const navigate = useNavigate()

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

    useEffect(()=>{
       const getProject = async() => {
   
        const response = await axios.post(`https://small-project-website.onrender.com/user/project/${id}`,{
            id
        },{
            headers:{
                'Content-Type':'application/json',
                'Authorization':'bearer '+ localStorage.getItem('token')
            }
        })

        const project = await response.data.project

        setTitle(project.title)
        setDescription(project.description)
        setImageLink(project.imageLink)
        setGithubLink(project.githubLink)
        setDemoLink(project.demoLink)
        setTags(project.tags)
        setCode(project.code)
        setExplanation(project.explanation)
        setTagString(project.tags.join('#'))

       }

       getProject()
    },[])

    const editCourse = async() => {
        const response = await axios.put(`http://localhost:3000/admin/project/${id}`,{
            title,demoLink ,description,tags,code,explanation,imageLink,githubLink
        },{
            headers:{
                'Content-Type':'application/json',
                'Authorization':'bearer '+ localStorage.getItem('token')
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

                {toggle === 'A' &&   <EditBasic setTitle={setTitle} setDescription={setDescription} setImageLink={setImageLink} setTags={setTags} setGitHubLink={setGithubLink} setDemoLink={setDemoLink} toggle={setToggle} title={title} description={description} imageLink={imageLink} tags={tags} githubLink={githubLink} demoLink={demoLink} tagString={tagString} setTagString={setTagString}/>}

                {toggle === 'B' && <EditExplanation toggle={setToggle} setExplanation={setExplanation} explanation={explanation}/>}

                {toggle === 'C' && <EditCode code={code} toggle={setToggle}  setCode={setCode}/>}
                
                {toggle === 'D' && <div style={{width:'100%',height:'100%',display:"flex",alignItems:"center",justifyContent:"center"}}> <button onClick={()=>editCourse()} className="btn explanation-btn">Submit</button></div>}
              
                
             
             </div>
         </div>
    </div>
</div>
  )
}
