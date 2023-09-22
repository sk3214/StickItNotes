import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import env from './utils/validateEnv';
import noteRoutes from './routes/notes';
import { connectDB } from './config/db';
import morgan from 'morgan';

const app = express();
const port = env.PORT || 5000;
connectDB();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/notes',noteRoutes);

app.use((req,res,next)=>{
    next(Error('Incorrect URL'));
})

app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
        let errorMessage = 'An unknown error occured';
        if(error instanceof Error){
            errorMessage = error.message;
        }
        res.status(500).json({error:errorMessage});

});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
app.listen(port!,()=>{
    console.log('Server running on Port: '+port);
})