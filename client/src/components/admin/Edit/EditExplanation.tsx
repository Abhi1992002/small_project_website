
type explanationType = {
    toggle : React.Dispatch<React.SetStateAction<string>>,
    setExplanation : React.Dispatch<React.SetStateAction<string>>,
    explanation:string
    }
    

export default function EditExplanation({toggle,setExplanation,explanation}:explanationType) {

    function submitHandler(){
        toggle('C')
   
    }

    function backHandler(){
        toggle('A')
    }
  return (
   
       <div className="explanation-dashboard-wrapper">
      <h1 className="heading text-center">Explanation</h1>
      <textarea className="subheading" value={explanation} onChange={(e)=>{setExplanation(e.target.value)}} ></textarea>
      <div className="button-wrapper-main-dashboard">
                     <button onClick={backHandler} className="btn code-btn">Back</button>
                     <button className="btn explanation-btn" onClick={submitHandler} >Next</button>
        </div>
    </div>
 
  )
}
