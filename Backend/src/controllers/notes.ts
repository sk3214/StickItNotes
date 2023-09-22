import { RequestHandler } from "express";
import noteModel from '../models/note';


export const getNotes:RequestHandler = async(req, res,next) => {
    try{
        const notes = await noteModel.find().exec();
        res.status(200).json(notes);    
    }catch(error){
        next(error);
    }
}

export const createNotes:RequestHandler = async(req, res,next)=>{
    try{

    }catch(error){
        next(error);
    }
}