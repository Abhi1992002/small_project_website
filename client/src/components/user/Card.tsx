import { useNavigate } from "react-router-dom";
import edit from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import axios from "axios";

type cardProps = {
  title: string;
  description: string;
  tags: string[];
  id: string;
  demoLink: string;
  gitHubLink: string;
  imageLink: string;
};

export default function Card({
  title,
  description,
  tags,
  id,
  demoLink,
  gitHubLink,
  imageLink,
  ...rest
}: cardProps) {
  console.log({ id, imageLink, ...rest });

  const navigate = useNavigate();

  function codeHandler() {
    navigate(`/code/` + id);
  }

  function explanationHandler() {
    navigate(`/explanation/` + id);
  }

  const deleteHandler = async() => {
     const response = await axios.delete(`http://localhost:3000/admin/project/${id}`,{
      headers:{
         'Authorization':'bearer '+localStorage.getItem('token')
      }
     })

    const message = response.data.message 

    alert(message)

    navigate('/')
  }

  return (
    <div className="card-wrapper" {...rest} style={{ position: "relative" }}>
      {/* Edit image */}
      {localStorage.getItem("token") && (
        <button
          className="btn demo-btn"
          onClick={()=>navigate('/dashboard-edit/'+id)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
          }}
        >
          <img src={edit} style={{ width: "20px" }} alt="" />
        </button>
      )}
      {localStorage.getItem("token") && (
        <button
          className="btn github-btn"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            cursor: "pointer",
          }}
          onClick={deleteHandler}
        >
          <img src={deleteIcon} style={{ width: "20px" }} alt="" />
        </button>
      )}

      <div className="card-image">
        <img src={imageLink} alt="" />
      </div>
      <div className="card-content">
        <h1 className="subheading" style={{ textTransform: "uppercase" }}>
          {title}
        </h1>
        <p className="para">{description}</p>
        <div className="button-wrapper-card">
          <button onClick={explanationHandler} className="explanation-btn btn">
            Explanation
          </button>
          <a href={demoLink} target="_blank" className="demo-btn btn">
            Demo
          </a>
          <button onClick={codeHandler} className="code-btn btn">
            Code
          </button>
          <a href={gitHubLink} target="_blank" className="github-btn btn">
            Github
          </a>
          {tags.map((tag, i) => {
            return (
              <button key={i} id={String(i)} className="tag-btn btn">
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
