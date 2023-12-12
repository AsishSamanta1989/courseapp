import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {courseState} from "../../store/atoms/course"
import {isCourseLoading, courseTitle} from "../../store/selectors/course"
import { useEffect } from "react";
import {Loading} from "./Loading"
import { Grid } from "@mui/material";
import axios from "axios";


function Course(){

    let {courseId} = useParams();
    const setCourse = useRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading)

    useEffect(() =>{
        axios.get(`http://localhost:3000/admin/course/{courseId}`,{
        method: "GET",
        headers :{
            "Authorization" : "Bearer " + localStorage.getItem("token")
        }
    }).then(res => {
        setCourse({isloading: false, course : res.data.course});
    }).catch(e => {
        setCourse({isloading : false, course : null});
    })

        
    },[]);

    if(courseLoading){
        return <Loading />
    }

    return <div>
        <GrayTopper />

        <Grid container>
            <Grid item lg = {8} md = {12} sm = {12}>
                <UpdateCard />

            </Grid>
            <Grid item lg = {8} md = {12} sm = {12}>
                <CourseCard />

            </Grid>


        </Grid>

    </div>
}

function GrayTopper(){

        const title = useRecoilValue(courseTitle);
        return <div style = {{height : 250, background : "#212121", top : 0,width : "100vw", zIndex : 0, marginBottom : -250}}>
            <div style = {{height : 250, display :"flex", justifyContent :"center", flexDirection:"column"}}>

            </div>

        </div>

}

function UpdateCard(){

}

function CourseCard(){

}
    

export default Course;