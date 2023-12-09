import { Typography, Button, Card } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Courses(){
    const [courses, setCourses] = useState([]);
    const init = async() =>{
        const response = await axios.get (`http://localhost:3000/admin/courses/`,{
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        setCourses(response.data.courses)
    }

    useEffect(() =>{
        init();
    },[]);

    return<div style = {{display : "flex", flexWrap : "Wrap", justifyContent : "center"}}>
        {
            courses.map(course =>{
                return <Course course={course} />
            })
        }
    </div>

}

export function Course({course}){
    const navigate = useNavigate();

    return <Card style = {{
        marging : 10,
        width : 300,
        minHeight : 200,
        padding : 20
    }}>
        <Typography textAlign={"center"} variant="h5">
            {course.title}
        </Typography>

        <Typography textAlign={"center"} variant="subtitle1">
            {course.description}
        </Typography>

        <img src = {course.imageLink} style = {{width : 300}}></img>

        <div style = {{display : "felx", justifyContent :"center",marginTop:20}}>
            <Button variant="contained" size = "large" onClick={() =>{
                navigate("/course/" + course._id);
            }}>Edit</Button>
        </div>

    </Card>
}

export default Courses;
