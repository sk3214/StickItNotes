import express from 'express';

const app = express();
const port = undefined;

app.get('/', (req, res) => {
    res.send("Hello");
});


app.listen(port!,()=>{
    console.log('Server running on Port: '+port);
})