import React, { useContext } from 'react';
import { useState } from 'react';
import {Link,useNavigate} from "react-router-dom";
import { AuthContext } from '../componenets/context/authContext';
import axios from "axios";

const Login = () => {

  const[inputs,setInputs]=useState({username:"" ,password:""})

  const[err,setError]=useState(null);

  const navigate=useNavigate();

  const {login}=useContext(AuthContext);
  

  const handleChange=(e)=>{
    setInputs((prev)=>({...prev,[e.target.name]:e.target.value}));
  };


  const handleSubmit=async (e)=>{
    e.preventDefault();
    // console.log("I got logged in !");
    // console.log("inputs:",inputs);

    try{
      await login(inputs);
      navigate("/");
    
    }catch(err){
      setError(err.response.data);
    }
    
  };



  return (
    <div className="auth">
      <h1>Login </h1>
      <form>
        <input required type="text" placeholder="username" name="username" onChange={handleChange}></input>
        <input required type="password" placeholder="password" name="password" onChange={handleChange}></input>
        {err && <p>{err} </p>}
        <button onClick={handleSubmit}>Login</button>
        <span>Don't you have an account ? <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login