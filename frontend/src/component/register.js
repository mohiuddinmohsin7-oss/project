
import React from "react";
import {  useNavigate } from "react-router";
import { useState } from "react";
function Register() {
    const [user, setuser] = useState();
    const [pass, setpass] = useState();
    const nav = useNavigate();
    const handel = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "content-Type": "application/Json" },
            body: JSON.stringify({username: user, pass: pass})
        }).then(res => res.json()).then(data => {
            if (data.login) {
                nav('/login');
            }
            else{
                alert(data.error);
            }
        }
        );
    }
    return (
        <form onSubmit={handel} >
            <div className="flex flex-col items-center">
                <h1 className="text-center font-bold text-3xl"> Register</h1>
                <input className="border-2  border-black m-2 mt-8 p-1 rounded-xl" type="text" placeholder="enter your name" name="name" onChange={(e) => setuser(e.target.value)} />
                <input className="border-2  border-black m-2 p-1 rounded-xl" type="password" placeholder="enter your password" name="pass" onChange={(e) => setpass(e.target.value)} />
                <button type="submit" className="bg-red-500 text-white p-2 m-2 rounded-xl" >Submit</button>
            </div>
        </form>
    );
}
export default Register;