import express from 'express';
import 'dotenv/config';

import { connectDB } from './config/db';

const app = express();
const port = undefined;

connectDB();

app.get('/', (req, res) => {
    res.send("Hello");
});


app.listen(port!,()=>{
    console.log('Server running on Port: '+port);
})