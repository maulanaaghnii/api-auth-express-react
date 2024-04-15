
import React, { useState, useEffect } from 'react'
import {BrowserRouter, Route, Switch, Redirect, Routes} from "react-router-dom"
import Dashboard from "./components/Dashboard";
import Login  from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

function App() {

  //   return (
  //   <BrowserRouter>
  //     <Routes>

  //       <Route exact path="/">
  //         <Login/>
  //       </Route>
        
  //       <Route path="/register">
  //         <Register/>
  //       </Route>

  //       <Route path="/dashboard">
  //         <Navbar/>
  //         <Dashboard/>
  //       </Route>

  //     </Routes>
  //   </BrowserRouter>
  // );
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardWithNavbar />} />
      </Routes>
    </BrowserRouter>
  );
}

function DashboardWithNavbar() {
  return (
    <>
      <Navbar />
      <Dashboard />
    </>
  );
}
 
export default App;
