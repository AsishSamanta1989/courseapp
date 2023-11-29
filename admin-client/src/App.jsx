import { useState } from 'react'
import {userState} from "../store/atoms/user.js"
import { BASE_URL } from './config.js';
import { useEffect } from 'react';


function App() {

  return (
    <div style = {
      {
        width: "100vw",
        height : "100vh",
        backgroundColor: "#C7DFC5"
      }
    }>
       <InitUser />
      Hi from courseapp
    </div>
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
