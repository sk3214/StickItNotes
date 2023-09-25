import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import env from './utils/validateEnv';
import noteRoutes from './routes/notes';
import userRoutes from './routes/users';
import { connectDB } from './config/db';
import morgan from 'morgan';
import createHttpError,{isHttpError} from 'http-errors';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();
const port = env.PORT || 5000;
connectDB();
app.use(morgan('dev'));
app.use(express.json());
app.use(session({
    secret:env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:60*60*1000,
    },
    rolling:true,
    store:MongoStore.create({
        mongoUrl:env.MONGO_URI,
    }),
})); 

app.use('/api/notes',noteRoutes);
app.use('/api/users',userRoutes);

app.use((req,res,next)=>{
    next(createHttpError(404,'Incorrect URL entered!'));
})

app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
        console.error(error);
        let statusCode = 500;
        let errorMessage = 'An unknown error occured'
        if(isHttpError(error)){
            statusCode = error.status;
            errorMessage = error.message;
        }
        res.status(statusCode).json({error:errorMessage});

});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
app.listen(port!,()=>{
    console.log('Server running on Port: '+port);
})