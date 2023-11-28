const express = require ('express');
const mongoose = require("mongoose");
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require ("./routes/user");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin",adminRouter)
app.use("/user",userRouter)
app.use(express.static("public"));
app.use("/*", (req,res) => {
    console.log (path.join(__dirname,"/public/index.html"))
    res.sendFile(path.join(__dirname,"/public/index.html"));
});

//connect to Mongo DB

mongoose.connect('mongodb+srv://asishkgec:Baby%40789@courseportal.hmtdffz.mongodb.net/et/',{useNewUrlParser : true, useUnifiedTopology : true, dbName : "courseSite"});
//mongoose.connect('mongodb+srv://kirattechnologies:iRbi4XRDdM7JMMkl@cluster0.e95bnsi.mongodb.net/admin?authSource=admin&replicaSet=atlas-ue73sj-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.listen(3000,()=>{console.log("Server is running at port 3000")});