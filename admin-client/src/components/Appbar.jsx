import {useNavigate} from "react-router-dom"
import {isUserLoading} from "../../store/selectors/isUserLoading"
import {userEmailState} from "../../store/selectors/userEmail"
import { userState } from "../../store/atoms/user";
import {useRecoilValue, useSetRecoilState} from "recoil"
import {Typography, Button} from "@mui/material"

function Appbar({}){

    const navigate = useNavigate()
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState)

    if(userLoading){
        return <></>
    }

    if(userEmail){
        return <div style = {{
            display : "flex",
            justifyContent : "space-between",
            padding :  4,
            zIndex : 1
        }}>

            <div style = {{marginLeft:10, cursor:"pointer"}} onClick={() =>{
                navigate("/")
            }}>
                <Typography variant = {"h6"}>Coursera</Typography>

            </div>

            <div style = {{ margingRight:10, display:"flex"}}>

                    <div style = {{margingRight : 10}}>
                        <Button onClick = {() => {
                            navigate("/addcourse")
                        }}> Add Course

                        </Button>
                    </div>
                    <div style = {{margingRight : 10}}>
                        <Button onClick = {() => {
                            navigate("/courses")
                        }}> Courses

                        </Button>
                    </div>
                    <div style = {{margingRight : 10}}>
                        <Button variant = {"contained"}
                         onClick = {() => {
                            localStorage.setItem("token", null);
                            setUser({
                                isLoading : false,
                                userEmail : null
                            })
                        }}> LogOut

                        </Button>
                    </div>

            </div>


        </div>



    }else{
        return <div style = {{
            display:"flex",
            justifyContent : "space-between",
            padding :4,
            zIndex:1
        }}>
            <div style = {{marginLeft:10, cursor:"pointer"}} onClick={() =>{
                navigate("/")
            }}>
                <Typography variant = {"h6"}>Coursera</Typography>

            </div>

            <div style = {{display : "flex"}}>
                    <div  style = {{margingRight : 10}}>
                        <Button variant = {"contained"}
                        onClick = {() => {
                            navigate("/signup")
                        }}
                    >SignUp
                            
                        </Button>

                    </div>

                    <div  style = {{margingRight : 10, marginLeft : 10}}>
                        <Button variant = {"contained"}
                        onClick = {() => {
                            navigate("/signin")
                        }}
                    >Signin
                            
                        </Button>

                    </div>
                
            </div>


        </div>
    }

  

}

export default Appbar;

