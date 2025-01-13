import React from 'react'
import { useState } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios"; 

const Register = () => {

  const [inputs,setInputs]=useState({username:"" , email:"" ,password:""})

  const[err,setError]=useState(null);

  const navigate=useNavigate();




  const handleChange=(e)=>{

    setInputs( prev=>({...prev,[e.target.name]:e.target.value}))

  }

  const handleSubmit=async (e)=>{
    e.preventDefault();

    try{
      const res = await axios.post("http://localhost:8800/api/auth/register",inputs)
      // console.log(res);
      navigate("/login");
    }catch(err){
      setError(err.response.data);
    }

  }


  return (
    <div className="auth">
      <h1>Register </h1>
      <form>
        <input required type="text" placeholder="username" name="username" onChange={handleChange}></input>
        <input required type="email" placeholder="email" name="email" onChange={handleChange}></input>
        <input required type="password" placeholder="password" name="password" onChange={handleChange}></input>
        
        <button onClick={handleSubmit}>Register</button>
        
        <span>If you have an account goto <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register