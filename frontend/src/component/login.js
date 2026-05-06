import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username,setusername]=useState();
  const[pass,setpass]=useState();
  const navigate=useNavigate();
  const handelsubmit=(e)=>{
    e.preventDefault();
    fetch("http://localhost:5000/auth",{
      method:"POST",
      headers: {"content-Type":"application/Json"},
      body: JSON.stringify({username,pass})
    }).then(res=>res.json()).then(data=>{
    if(data.login)
    {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    }
    else
    {
      alert(data.error);
    }
    });
    
  }
  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Login</h2>
      
      <form onSubmit={handelsubmit}>
        <div className="flex flex-col items-center" >
        <input type="text" placeholder="Username"className="border-2  border-black m-2 p-1 rounded-xl" onChange={(e)=>setusername(e.target.value)} name="name"/>
        <input type="password" placeholder="Password" className="border-2 m-2 p-1 border-black rounded-xl"onChange={(e)=>setpass(e.target.value)} name="pass"/>
        <button type="submit"  className="bg-red-500 text-white p-2 m-2 rounded-xl">
          Login
        </button>
        </div>
      </form>
      
    </div>
  );
}
export default Login;