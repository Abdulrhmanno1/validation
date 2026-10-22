import { Router } from "express";
import express from "express";
import { createDB } from "../dp.js";
import z from "zod";
import { Schema } from "zod/v3";
import { validateBody, validateParams, validateQuery } from "../middlewhare/validateBody.js";
import { userSchema } from "../scheemas/user.schema.js";
export const authorRouter = express.Router();
const db =createDB();



authorRouter.use((req,res,next) =>{console.log("ia in router author" ); next();
})

authorRouter.get("/",validateQuery,validateParams ,async (req, res) => {
    const { search } = req.query;
    let author = await db.getAll("books");

    if (search) {
        books = books.filter(book =>
            book.name?.toLowerCase().startsWith(search.toLowerCase())
        );
    }

    res.json({ data: books });
});

authorRouter.get ("/:id",validateQuery,validateParams, async (req,res)=>{
    const oneBook = await db.getById("books",req.params.id); 
    res.json({
        data: oneBook
    }) 
});

authorRouter.post ("/",validateBody(userSchema.partial()) ,async (req,res)=> {
    const bookData= req.body; 
    
    await db.create("books", userData); 
    res.status(201).json({
        message : "book created "
    })
})
authorRouter.delete ("/:id", async (req,res)=>{
    const getId = req.params.id; 
    const check = await db.getById("users",getId)
    if (check){
        await db.delete("books",getId);
        res.status(204).json({
            message: "deleted"
        })
    }else{
        res.status(404).json({
            message: "not found"
        })
    }
})

authorRouter.patch("/:userid",validateBody(userSchema.partial()),async(req,res)=>{
    const uId =req.params.userid;
    const user = await db.getById("books",uId)
    if(!user){
        res.status(404).json({
            message : "notfound"
        })
    }
    
    await db.update("books",uId,req.body)
    const newuser = await db.getById("books",uId)
    res.status(200).json({
        message :"updated",
        data:newuser
    })   });