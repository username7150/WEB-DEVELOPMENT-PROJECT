const express = require("express");
const app = express();
app.use(express.static("public"));

const mysql = require("mysql2");

app.use(express.urlencoded({extended: true}));   

const path = require("path");
app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "/views"));



const connection =mysql.createConnection({
    host: "localhost",
    user:"root",
    database: "project",
    password: "Arun@123",
});


let port = 8080;

app.listen("8080",()=>{
    console.log("server is listening to port 8080");
});




app.get("/server",(req,  res)=>{
    res.render("page1.ejs");

});


app.get("/server/btn",(req,  res)=>{
    res.render("page2.ejs");

});




app.post( "/btn/insert" , (req, res)=>{
    let {Name , Email ,  Rating , Message } = req.body;
    console.log(req.body);
    let q = `INSERT INTO FEEDBACKS 
    VALUES 
    ('${Name}' ,
    '${Email}' ,
     ${Rating} ,
    '${ Message}'
    )`;
    
    try{

        connection.query( q, (err,result)=>{
        if (err) throw (err);
        console.log(" response submitted");

        res.render("page3.ejs");
    });

    } catch(err){
        res.send("some error in DB");
    }
    

});