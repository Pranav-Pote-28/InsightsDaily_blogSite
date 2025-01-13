import React,{useState,useEffect, useContext} from 'react'
import {Link,useLocation,useNavigate} from "react-router-dom"
import Edit from "../images/edit.png"
import Delete from "../images/delete.png"
import Menu from "../componenets/Menu"
import axios from "axios"
import moment from "moment"
import { AuthContext } from "../componenets/context/authContext";
import DOMPurify from "dompurify";

const Single = () => {


  const [post,setPost]=useState({});

  const location=useLocation();
  const navigate=useNavigate();

  const postId=location.pathname.split("/")[2];
  // console.log(postId);

  const {currentUser}=useContext(AuthContext);

  useEffect(()=>{
    const fetchData=async ()=>{
      try{
        const res=await axios.get(`http://localhost:8800/api/posts/${postId}`);
        setPost(res.data);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  },[postId]);

  
  const handleDelete = async()=>{
    try{
      await axios.delete(`http://localhost:8800/api/posts/${postId}`,{withCredentials: true});
      navigate("/")
    }catch(err){
      console.log(err);
    }
  }

  const getText=(html)=>{
    const doc=new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  }


  return (
    <div className="single">
      <div className="content">

        <div className="single-main-pic">
          <img src={`../../upload/${post?.img}`} alt="main image on single page" title="main pic of single page" />
        </div>
      <div className="user">
        <img src={post?.userImg} alt="User image" />
     
      <div className="info">
        <span>{post?.username}</span>
        <p>posted {moment(post.date).fromNow()}</p>
      </div>

      {currentUser && currentUser.username===post.username && (
         <div className="edit">
          <Link to={`/write?edit=2`} state={post}>
            {console.log(post)}
            <img src={Edit} alt="edit post" title="edit post"/>
          </Link>
          <img onClick={handleDelete} src={Delete} alt="delete post" title="delete post"/>
        </div>
      )}

      </div>

      <h1>{post.title}</h1>
      
        {/* {getText(post.desc)} */}

        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>  

      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single