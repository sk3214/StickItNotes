import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from '../models/user';
import bcrypt from 'bcrypt';

export const getAuthenticatedUser:RequestHandler =async (req,res,next) => {
    const authenticatedUserId = req.session.userId;
    try{
        if(!authenticatedUserId){
            throw createHttpError(401,"User not Authenticated");
        }
        const user = await userModel.findById(authenticatedUserId).select("+email").exec();
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
    
}



interface signUpBody{
    userName?:string,
    email?:string,
    password?:string,
}

export const signUp:RequestHandler<unknown, unknown, signUpBody, unknown> = async(req,res,next)=>{
    const {userName,email,password} = req.body
    console.log('Are we coming here?')
    try{
        if(!userName || !email || !password){
            throw createHttpError(400,"Check your fields!");
        }
        const existingUserName = await userModel.findOne({userName:userName});
        if(existingUserName){
            throw createHttpError(409,'UserName already exists');
        }
        const existingEmail = await userModel.findOne({email:email});
        if(existingEmail){
            throw createHttpError(409,'Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const newUser = await userModel.create({userName:userName,email:email,password:hashedPassword});
        req.session.userId = newUser._id;
        res.status(201).json(newUser);
    }catch(error){
        next(error);
    }
}

interface loginBody{
    userName:string,
    password:string,
}

export const login:RequestHandler<unknown,unknown,loginBody,unknown> = async(req,res,next)=>{
    const userName = req.body.userName;
    const password = req.body.password;
    try{
        if(!userName || !password){
            throw createHttpError(400,"Parameters missing");
        }
        const user = await userModel.findOne({userName:userName}).select('+password +email').exec();
        console.log(user);
        if(!user){
            throw createHttpError(401,"Invalid Credentials");
        }
        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            throw createHttpError(401,"Invalid Credentials");
        }
        req.session.userId = user._id;
        res.status(201).json(user);
    }catch(error){
        next(error);
    }
}

export const logOut:RequestHandler = (req,res,next)=>{
    req.session.destroy((error)=>{
        // console.log('error object', error);
        if(error){
            next(error);
        }else{
            res.sendStatus(200);
        }
    })
}