// import Card from "./Card";
import { useEffect, useState } from 'react'
import searchIcon from '../../assets/search.svg'
import sendIcon from '../../assets/send.png'
import axios from 'axios'
import Card from './Card'
import { Link } from 'react-router-dom'

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
}[]

export default function Main() {

    const [search , setSearch] = useState('')
    const [cardDetail , setCardDetail] = useState<projectDataType | []>([]) 

    function submitHandler(){
      const getRequest = async() => {
      try {
        const response = await axios.post(`https://small-project-website.onrender.com/user/search/${search}`,{
          pageNumber:1
      },{
          headers:{"Content-Type":"application/json"
      }
      })

      const data = response.data 

      const projects:projectDataType = data.projects

      setCardDetail(projects)
      } catch (error) {
        alert('no such tag exist')
        setSearch('')
      }
     }

     //for real time 
     // setInterval(()=>{
     //   getRequest()
     // },5000)
     
     //refresh
      getRequest()
    }

    useEffect(()=>{
       
        const getRequest = async() => {
           const response = await axios.post('https://small-project-website.onrender.com/user/projects',{
                pageNumber:1
            },{
                headers:{"Content-Type":"application/json"
            }
            })

            const data = response.data 

            const projects:projectDataType = data.projects

            setCardDetail(projects)
        }

        //for real time 
        // setInterval(()=>{
        //   getRequest()
        // },5000)
        
        //refresh
         getRequest()
    },[])

  return (
    <div className="main-wrapper">

        {/* login button */}
        <Link className='btn demo-btn' to={'/login'} style={{position:"absolute" , top:'30px' , right:'50px'}}>Login</Link>

        {/* create button */}
        {localStorage.getItem('token') && <Link className='btn explanation-btn' to={'/dashboard-basic'} style={{position:"absolute" , top:'30px' , left:'50px'}}>Create card</Link>}

        {/* inuput container */}
        <div className="input-container">
        
        <div>
        <img src={searchIcon} className='search-icon-main'/> 
        <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text" placeholder="Search by Tag" className='main-input'/>
        <button className='btn explanation-btn' onClick={submitHandler}>
        <img src={sendIcon} style={{width:'40px'}} className='send-icon-main'/> 
        </button>
        </div>
        
       
      </div>

      {/* card-gallery */}
      <div className="card-gallery-main">
        <div className="card-container-main">
        {
           cardDetail.map((card,i)=>{
               return <Card key={String(i)} description={card.description} tags={card.tags}
               id={card._id}  demoLink={card.demoLink} gitHubLink={card.githubLink}  title={card.title} imageLink={card.imageLink}/>
            
           })
        }
        </div>
        
      </div>
    </div>
  )
}
