import { useParams } from "react-router-dom";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {courseState} from "../../store/atoms/course"
import {isCourseLoading, courseTitle, courseImage, coursePrice} from "../../store/selectors/course"
import { useEffect, useState } from "react";
import {Loading} from "./Loading"
import { Grid, Typography, Card, TextField, Button } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../config.js";
//import { courseTitle, coursePrice, isCourseLoading, courseImage } from "../../store/selectors/course.js";

function Course(){

    let {courseId} = useParams();
    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading)
    
    useEffect(() => {
        axios.get(`http://localhost:3000/admin/course/${courseId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourse({isLoading: false, course: res.data.course});
        })
        .catch(e => {
            setCourse({isLoading: false, course: null});
        });
    }, []);

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

                <div>
                    <Typography style = {{color: "white", fontWeight : 600 }} variant="h5" textAlign={"center"}> {title} </Typography>
                
                </div>
                

            </div>

        </div>

}

function UpdateCard(){

    const [courseDetails, setCourse] = useRecoilState(courseState);
    const [title, setTitle] = useState(courseDetails.course.title);
    const [description, setDescription] = useState(courseDetails.course.description);
    const [image, setImage] = useState(courseDetails.course.imageLink);
    const [price, setPrice] = useState(courseDetails.course.price);

    return <div style = {{display : "flex", justifyContent:"center"}}>
        <Card variant={"outlined"} style ={{ maxWidth:600, marginTop : 200}}>
            <div style={{padding : 20}}>
                <Typography style = {{marginBottom: 10}}> Update Course Details</Typography>
                <TextField value = {title}
                style = {{marginBottom : 10}}
                onChange={(e) =>{
                    setTitle(e.target.value)
                }}
                label = "title"
                fullWidth ={true}
                variant="outlined"></TextField>

                <TextField value = {description}
                style = {{marginBottom : 10}}
                onChange={(e) =>{
                    setDescription(e.target.value)
                }}
                label = "description"
                fullWidth ={true}
                variant="outlined"></TextField>

                <TextField value = {image}
                style = {{marginBottom : 10}}
                onChange={(e) =>{
                    setImage(e.target.value)
                }}
                label = "Image Link"
                fullWidth ={true}
                variant="outlined"></TextField>

                <TextField value = {price}
                style = {{marginBottom : 10}}
                onChange={(e) =>{
                    setPrice(e.target.value)
                }}
                label = "Price"
                fullWidth ={true}
                variant="outlined"></TextField>

                <Button
                variant = "contained"
                onClick={async() =>{
                    await axios.put(`http://localhost:3000/admin/course/`+courseDetails.course._id,{
                        title : title,
                        description: description,
                        imageLink : image,
                        published : true,
                        price
                        
                    },{
                        headers : {
                            "Content-Type" : "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    let updatedCourse = {
                        _id : courseDetails.course._id,
                        title : title,
                        description: description,
                        imageLink : image,
                        published : true,
                        price
                        
                    };

                    setCourse({course: updatedCourse, isLoading: false});
                }}>Update Course

                </Button>



                
            </div>

        </Card>

    </div>

}

function CourseCard(){

    const title = useRecoilValue(courseTitle);
    const imageLink = useRecoilValue(courseImage);

    return <div style = {{display : "flex", marginTop : 50, justifyContent:"center" , width : "100%"}}>
        <Card style = {{
            margin: 10,
            width : 350,
            minHeight:200,
            borderRadius:20,
            marginRight:50,
            paddingBottom:15,
            zIndex:2,
           
        }}>
            <img src = {imageLink} style = {{width :350}}></img>
            <div style = {{MarginLeft:10 }} >
                <Typography variant = "h5" align="center">{title}</Typography>
                <Price />

            </div>
        </Card>



    </div>

}
    
function Price (){

    const price = useRecoilValue(coursePrice);
    return <>
    <Typography align="center" variant="subtitle1" style={{color: "gray"}}>
        Price
    </Typography>
    <Typography align="center" variant="subtitle2">
        <b>Rs {price} </b>
    </Typography>
</>

}

export default Course;