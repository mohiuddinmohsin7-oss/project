import React from "react";
import LandingPage from "./component/landingpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Dashboard from "./component/dashboard";
import Register from "./component/register";

function App() {
return (
 <BrowserRouter>
 <Routes>
  <Route element={<LandingPage/>} path="/"/>
   <Route element={<Register/>} path="/register" />
  <Route element={<Login/>} path="/login"/>
  <Route element={<Dashboard/>}path="/dashboard"/>
 
 </Routes>
 </BrowserRouter>
);
}

export default App;