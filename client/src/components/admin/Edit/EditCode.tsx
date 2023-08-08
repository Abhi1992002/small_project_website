import { useEffect, useState } from "react";

type codeType = {
    toggle: React.Dispatch<React.SetStateAction<string>>;
    setCode: React.Dispatch<React.SetStateAction<object[]>>; 
    code:object[]
  };

  
export default function EditCode({code,toggle, setCode }: codeType) {
 
    const [html , setHtml] = useState(false)
    const [css , setCss] = useState(false)
    const [js , setJs] = useState(false)
    const [ts , setTs] = useState(false)
    const [react , setReact] = useState(false)
  
    const [htmlCode , setHtmlCode] = useState('')
    const [cssCode , setCssCode] = useState('')
    const [jsCode , setJsCode] = useState('')
    const [tsCode , setTsCode] = useState('')
    const [reactCode , setReactCode] = useState('')

    useEffect(()=>{
        code.forEach((c) => {
            if('HTML' in c) {
                setHtml(true)
                setHtmlCode(String(c.HTML))
            }
            if('CSS' in c) {
                setCss(true)
                setCssCode(String(c.CSS))
            }
            if('JS' in c) {
                setJs(true)
                setJsCode(String(c.JS))
            }
            if('TS' in c) {
                setTs(true)
                setTsCode(String(c.TS))
            }
            if('React' in c) {
                setReact(true)
                setReactCode(String(c.React))
            }
        })
    },[])
  
    const submitHandler = () => {
      const codeArray:object[] = []
       if(html) codeArray.push({HTML:htmlCode})
       if(css) codeArray.push({CSS:cssCode})
       if(js) codeArray.push({JS:jsCode})
       if(ts) codeArray.push({TS:tsCode})
       if(react) codeArray.push({React:reactCode})
  
       setCode(codeArray)
  
       toggle('D')
    }
    
    function backHandler(){
      toggle('B')
    }
 
    return (
  

    <div className="code-dashboard-wrapper">
      <div className="choose-language-wrapper">
        <h1 className="headinng">Choose language</h1>
        <div className="choose-language-input">

        <div>
          <input type="checkbox" checked={html} id="HTML" name="HTML" value="HTML" onChange={()=>{setHtml(!html)}}/>
          <label style={{marginLeft:'10px'}} className="subheading" htmlFor="HTML">HTML</label>
        </div>

        <div>
          <input type="checkbox" checked={css} id="CSS" name="CSS" value="CSS" onChange={()=>{setCss(!css)}}/>
          <label style={{marginLeft:'10px'}} className="subheading" htmlFor="CSS">CSS</label>
        </div>

        <div>
          <input onChange={()=>{setJs(!js)}} checked={js} type="checkbox" id="JS" name="JS" value="JS" />
          <label style={{marginLeft:'10px'}} className="subheading" htmlFor="JS">JS</label>
        </div>

        <div>
          <input onChange={()=>{setTs(!ts)}} checked={ts} type="checkbox" id="TS" name="TS" value="TS" />
          <label style={{marginLeft:'10px'}} className="subheading" htmlFor="TS">TS</label>
        </div>

        <div>
          <input onChange={()=>{setReact(!react)}} checked={react} type="checkbox" id="React" name="React" value="React" />
          <label style={{marginLeft:'10px'}} className="subheading" htmlFor="React">React</label>
        </div>

        </div>
      </div>
      <div className="code-dashboard-container">
           {html && <textarea value={htmlCode} onChange={(e)=>{
            setHtmlCode(e.target.value)
           }} placeholder="Enter Html Code" className="input"></textarea>}
           {css && <textarea value={cssCode} onChange={(e)=>{
            setCssCode(e.target.value)
           }} placeholder="Enter Css Code" className="input"></textarea>}
           {js && <textarea value={jsCode} onChange={(e)=>{
            setJsCode(e.target.value)
           }} placeholder="Enter JS Code" className="input"></textarea>}
           {ts && <textarea value={tsCode} onChange={(e)=>{
            setTsCode(e.target.value)
           }} placeholder="Enter TS Code" className="input"></textarea>}
           {react && <textarea value={reactCode} onChange={(e)=>{
            setReactCode(e.target.value)
           }} placeholder="Enter React Code" className="input"></textarea>}
      </div>
      <div className="button-wrapper-main-dashboard">
                     <button onClick={backHandler} className="btn code-btn">Back</button>
                     <button className="btn explanation-btn" onClick={submitHandler} >Finish</button>
        </div>
    </div>
  )
}
