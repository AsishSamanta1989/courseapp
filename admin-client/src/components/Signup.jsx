import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {BASE_URL} from "../config.js";
import {userState} from "../../store/atoms/user.js"
import { TextField, Typography } from "@mui/material";
import {Card,Button} from "@mui/material";
import axios from "axios";



function Signup (){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    return <div>
            <div style ={{
                paddingTop: 150,
                marginBottom: 10,
                display : "flex",
                justifyContent: "center"
            }}>
                <Typography variant = {"h6"}>
                    Welcome to Coursera. Signup Below.
                </Typography>

            </div>
            <div style = {{display : "flex", justifyContent: "center"}}>
                <Card variant = {"outlined"} style = {{width : 400,padding:20}}>
                    <TextField
                    onChange={(event) =>{
                        setEmail(event.target.value);
                    }}
                    fullWidth = {true}
                    label = "Email"
                    variant = "outlined">

                    </TextField>
                    <br></br>
                    <br></br>

                    <TextField
                    onChange={(event) =>{
                        setPassword(event.target.value);
                    }}
                    fullWidth = {true}
                    label = "password"
                    variant = "outlined"
                    type = {"password"}>

                    </TextField>
                    <br></br>
                    <br></br>
                    <Button size = {"large"}
                    variant = {"contained"}
                    onClick={async() =>{
                        try{
                        const response = await axios.post(`http://localhost:3000/admin/signup`,{
                            username: email,
                            password:password
                        })
                        let data = response.data;
                        localStorage.setItem("token",data.token);
                        setUser({userEmail: "email", isLoading : false})
                        navigate("/courses")
                    }catch(e){
                        navigate ("/Signuperror");
                    }

                    }}>
                        Signup
                    </Button>

                </Card>

            </div>


    </div>

}

export default Signup;