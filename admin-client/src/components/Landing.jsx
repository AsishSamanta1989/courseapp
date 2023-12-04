import {Grid, Typography} from '@mui/material';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import {userEmailState} from '../../store/selectors/userEmail';
import {useRecoilValue} from "recoil";
import {isUserLoading} from '../../store/selectors/isUserLoading';


function Landing () {
    const navigate = useNavigate();
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(isUserLoading);

    return <div>
        <Grid container style = {{padding: "5vw"}}>

            <Grid item xs = {12} md = {6} lg = {6}>
                <div>
                    <Typography variant = {"h2"}>
                        Course Admin
                    </Typography>

                    <Typography variant = {"h5"}>
                        A place to learn and Earn
                    </Typography>

                    { !userLoading && !userEmail && <div style = {{display:"flex",marginTop:20}}>
                        <div style = {{marginRight: 10}}>
                            <Button size = {"large"}
                            variant= {"contained"}
                            onClick={() =>{
                                navigate("/signin")
                            }}
                            >Signin

                            </Button>

                            </div>

                            <div style = {{marginRight: 10}}>
                            <Button size = {"large"}
                            variant= {"contained"}
                            onClick={() =>{
                                navigate("/signup")
                            }}
                            >Signup

                            </Button>
                            
                            </div>

                    </div>

                    }

                </div>

            </Grid>

            <Grid item xs = {12} md = {6} lg = {6}>
                <img src = {"/class.jpeg"} width = {"100%"} />
            </Grid>

        </Grid>

    </div>
    
}

export default Landing;