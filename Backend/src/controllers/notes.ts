import { RequestHandler } from "express";
import noteModel from '../models/note';
import createHttpError from "http-errors";
import mongoose from "mongoose";



export const getNotes:RequestHandler = async(req, res,next) => {
    try{
        throw createHttpError(401);
        const notes = await noteModel.find().exec();
        res.status(200).json([]);    
    }catch(error){
        next(error);
    }
}

export const getNote:RequestHandler = async(req,res,next) => {
    const noteId = req.params.noteId
    try{
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note id");
        }
        const note = await noteModel.findById(noteId).exec();
        if(!note){
            throw createHttpError(404,"Note not found");
        }
        res.status(200).json(note);
    }catch(error){
        next(error);
    }
}

interface createNoteBody{
    title?:string,
    text?:string,
}

export const createNotes:RequestHandler<unknown,unknown,createNoteBody,unknown> = async(req, res,next)=>{
    const title = req.body.title;
    const text = req.body.text;
    try{
        if(!title){
            throw createHttpError(400,"Note must have a title");
        }
        const newNote = await noteModel.create({title:title,text:text});
        res.status(201).json(newNote);        
    }catch(error){
        next(error);
    }
}

interface updateNoteParams{
    noteId:string
}

interface updateNodeBody{
    title?:string,
    text?:string,

}

export const updateNote:RequestHandler<updateNoteParams,unknown,updateNodeBody,unknown> =async (req,res,next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    try{
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note id");
        }
        if(!newTitle){
            throw createHttpError(400,"Note must have a title");
        }
        const note = await noteModel.findById(noteId).exec();
        if(!note){
            throw createHttpError(404,"Note not found");
        }
        note.title = newTitle;
        note.text = newText;

        const updateNote = await note.save();
        res.status(201).json(updateNote);
    }catch(error){
        next(error);
    }
}

export const deleteNote:RequestHandler = async(req,res,next)=>{
    const noteId = req.params.noteId;
    try{
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note id");
        }
        const note = await noteModel.findById(noteId).exec();
        if(!note){
            throw createHttpError(404,"Note not found");
        }
        await note.delete();
        res.status(204);
    }catch(error){
        next(error);
    }

}