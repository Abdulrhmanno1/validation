import express, { json } from "express"; 


import { authorRouter } from "./routes/authors.routes.js";
const app = express();  
app.use(express.json())


app.use("/authors",authorRouter)

app.use ((err,req,res,next)=>{
    console.log("err",err);
    res.status(500).json({err : "error in code"})

});










app.listen (3000, ()=>{
    console.log("server on 3000 port ");
    
})