import React, { useState } from 'react';
// import { use } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';


const Write = () => {

  const state=useLocation().state;
  const[value,setValue]=useState(state?.desc||'');
  const[file,setFile]=useState(null);
  const[cat,setCat]=useState(state?.cat||"");
  const[title,setTitle]=useState(state?.title||"")

  const navigate=useNavigate();


  const upload= async()=>{

    try{
      const formData=new FormData();

      // if(file){
      //   alert("Image uploaded successfully!");
      // }
      formData.append("file",file);
      const res=await axios.post("http://localhost:8800/api/upload",formData);
      
      return res.data;

    }catch(err){
      console.log(err);
    }


  }

  const handleClick= async e=>{
    e.preventDefault();
    const imgUrl=file?await upload():state.img;
    

    try{

      state?await axios.put(`http://localhost:8800/api/posts/${state.id}`,{title,desc:value,cat,img:file?imgUrl: state.img},{withCredentials: true}):
      await axios.post(`http://localhost:8800/api/posts/`,{title,desc:value,cat,img:file?imgUrl: "",date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")},{withCredentials: true})

      navigate("/")

    }catch(err){

      console.log(err)
    }
  }


  return (
    <div className="add">
      <div className="content">
        <input type="text" value={title} placeholder="Title... " onChange={e=>setTitle(e.target.value)}></input>
        <div className="editorContainer">
        <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">

        <div className="item">
          <h1>Publish</h1>
          <span><b>status: </b>draft</span>
          <span><b>Visibility: </b>public</span>
          <input style={{display:'none'}} type="file" id="file" onChange={e=>setFile(e.target.files[0])}></input>
          <label className="file" id="upload" htmlFor='file'>upload image </label>
          <div className="buttons">
            <button>save as draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>

        <div className="item">
          <h1>Category</h1>

          <div className="cat">
            <input type="radio" checked={cat==="art"} name="cat" value="art" id="art"  onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='art'>Art</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat==="science"} name="cat" value="science" id="science" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='science'>science</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat==="technology"} name="cat" value="technology" id="technology" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='technology'>technology</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat==="cinema"} name="cat" value="cinema" id="cinema" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='cinema'>cinema</label>
          </div>
          
          <div className="cat">
            <input type="radio" checked={cat==="food"} name="cat" value="food" id="food" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='food'>food</label>  
          </div>

          <div className="cat">
            <input type="radio" checked={cat==="sports"} name="cat" value="sports" id="sports" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='sports'>sports</label>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Write