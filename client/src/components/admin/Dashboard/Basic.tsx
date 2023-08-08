
type basicPropType = {
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    setTags: React.Dispatch<React.SetStateAction<string[]>>,
    setImageLink: React.Dispatch<React.SetStateAction<string>>,
    setGitHubLink: React.Dispatch<React.SetStateAction<string>>,
    setDemoLink: React.Dispatch<React.SetStateAction<string>>
    toggle: React.Dispatch<React.SetStateAction<string>>,
    setTagString:React.Dispatch<React.SetStateAction<string>>

    title:string,
    description:string,
    tags:string[],
    imageLink:string,
    githubLink:string,
    demoLink:string,
    tagString:string
  
  }

export default function Basic({setTitle,setDescription,setTags,setImageLink,setGitHubLink,setDemoLink,toggle,title,description,tags,imageLink,githubLink,demoLink,tagString,setTagString}:basicPropType) {

   function tagsHandler(e:React.ChangeEvent<HTMLInputElement>){
       const tagString = e.target.value

       setTagString(tagString)

       setTags(tagString.split('#'))

   }

   function submitHandler(){
    toggle('B')
   }

  return (
    <div className="basic-dashboard">
                     <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="input" placeholder="Enter Title" />
                     <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className="input" placeholder="Enter Description" />
                     <input type="text" value={imageLink} onChange={(e)=>setImageLink(e.target.value)} className="input" placeholder="Enter Image link " />
                   
                   <div className="input-container-basic">
                   <input type="text" value={tagString} onChange={tagsHandler} className="input" placeholder="Enter Tags | use # before each tag except for first tag" />

                   <div className="button-container-basic">
                   {tags?.map((tag,i)=>{
                    return <button key={String(i)} className="btn demo-btn">{tag}</button>
                   })}
                   </div>
                   </div>
                
      
                     <input type="text" value={githubLink} onChange={(e)=>setGitHubLink(e.target.value)} className="input" placeholder="Enter GitHub Link" />
                     <input type="text" value={demoLink} onChange={(e)=>setDemoLink(e.target.value)} className="input" placeholder="Enter Demo Link" />
                     <div className="button-wrapper-main-dashboard">
                     <button disabled style={{background:'transparent',border:'none'}}></button>
                     <button className="btn explanation-btn" onClick={submitHandler} >Next</button>
        </div>
    </div>
  )
}
