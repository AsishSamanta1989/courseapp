import { useState } from "react";
import { Button, Card, TextField } from "@mui/material";
import axios from "axios";



function AddCourse(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);

    return <div style = {{display : "flex", justifyContent :"center", flexDirection : "column" , minHeight:"80vh"}} >
        <div style = {{ display : "flex", justifyContent: "center"}}>

        <Card variant={"outlined"} style = {{width : 400, padding:20, marginTop : 30, height : "100%"}}>
            <TextField fullWidth = {true}
            style = {{marginBottom : 10}}
            onChange={(e) =>{
                setTitle(e.target.value)
            }}
            label = "Title"
            variant = "outlined"
            >

            </TextField>

            <TextField fullWidth = {true}
            style = {{marginBottom : 10}}
            onChange={(e) =>{
                setDescription(e.target.value)
            }}
            label = "Description"
            variant = "outlined"
            >

            </TextField>

            

            <TextField fullWidth = {true}
            style = {{marginBottom : 10}}
            onChange={(e) =>{
                setImage(e.target.value)
            }}
            label = "Image Link"
            variant = "outlined"
            >

            </TextField>

           

            <TextField fullWidth = {true}
            style = {{marginBottom : 10}}
            onChange={(e) =>{
                setPrice(e.target.value)
            }}
            label = "Price"
            variant = "outlined"
            >

            </TextField>

            <Button
            size = "large"
            variant="contained"
            onClick={async() =>{

                await axios.post(`http://localhost:3000/admin/courses`,{
                    title: title,
                    description: description,
                    imageLink : image,
                    published : true,
                    price
                },{
                    headers:{
                        "Authorization" : "Bearer " + localStorage.getItem("token")
                    }
                });
                alert("Added Course!");

            }}>Add Course

            </Button>
        </Card>

        </div>
        
        

    </div>
}

export default AddCourse;