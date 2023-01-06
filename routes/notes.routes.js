const express = require('express');
const jwt =require('jsonwebtoken');
const NotesModel = require('../models/Notes.model');
const notesController = express.Router();


notesController.post("/create",async (req, res)=>{
       const {title,note,label,userId} = req.body;
       const newnotes=new NotesModel({
           title,
           note,
           label,
           userId
       })
       await newnotes.save()
     res.send({"message":"note created successfully",newnotes})
})


notesController.get("/",async (req, res)=>{
   const {userId} = req.body;
   const notes = await NotesModel.find({userId})
   res.send({"message":"All your Notes",notes})
})


notesController.patch("/:noteId/edit",async (req, res)=>{
    const {noteId} = req.params;
    const {userId} = req.body;
    const checknote = await NotesModel.findOne({_id:noteId})
    console.log(checknote)
    if(checknote.userId === userId){
        const edit_note=await NotesModel.findOneAndUpdate({_id:noteId},req.body,{new:true})
        return res.send({"message":"note updated successfully",edit_note})
    }else{
        return res.send("you are not authorized to edit this note")
    }
 })



 notesController.delete("/:noteId/delete",async (req, res)=>{
    const {noteId} = req.params;
    const {userId} = req.body;
    const checknote = await NotesModel.findOne({_id:noteId})
    console.log(checknote)
    if(checknote.userId === userId){
        const edit_note=await NotesModel.findOneAndDelete({_id:noteId})
        return res.send({"message":"note Deleted successfully"})
    }else{
        return res.send("you are not authorized to edit this note")
    }
 })
 
module.exports = notesController