import React from 'react';
import {Layout} from "./components/global/Layout/Layout"
import {Link, Routes, Route} from "react-router-dom";
import {Login} from "./components/ui/Login/Login";
import {Register} from "./components/ui/Register/Register";

function App() {
    return (
       <>
           <Routes>
               <Route path={"/"} element={<Layout/>}/>
               <Route path={"/login"} element={<Login/>}/>
               <Route path={"/register"} element={<Register/>}/>
           </Routes>




       </>
    )
}

export default App;
