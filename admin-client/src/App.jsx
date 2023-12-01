import { useState } from 'react'
import {userState} from "../store/atoms/user.js"
import { BASE_URL } from './config.js';
import { useEffect } from 'react';
import { useSetRecoilState, RecoilRoot } from 'recoil';
import Appbar from "./components/Appbar.jsx";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import Signuperror from "./components/Signuperror.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <RecoilRoot>
      <Router>
    <div style = {
      {
        width: "100vw",
        height : "100vh",
        backgroundColor: "#C7DFC5"
      }
    }>
    
       <InitUser />
       <Appbar />
      Hi from courseapp
        <Routes>

          <Route path = {"/signup"} element = {<Signup />}></Route>
          <Route path = {"/signuperror"} element = {<Signuperror />}></Route>
          <Route path = {"/signin"} element = {<Signin />}></Route>

        </Routes>
    </div>
    </Router>
    </RecoilRoot>
  )


}

function InitUser(){
  const setUser = useSetRecoilState(userState);

  const init = async() =>{
    try{
      const response = await axios.get(`${BASE_URL}/admin/me`,{
        header : {
          "Authorization" : "Bearer " + localStorage.getItem("token")
        }
      });

      if (response.data.username){
        setUser({
          isLoading : false,
          userEmail : response.data.username
        })}else {
          setUser({
            isLoading : false,
            userEmail : null
        })
      }

    }catch(e){
      setUser({
        isLoading : false,
        userEmail : null

    })
  }
}

useEffect(() =>{
  init();
},[]);

return <></>

}
export default App;
