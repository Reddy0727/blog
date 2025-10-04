import express from 'express';

const app = express();
const port = process.env.PORT || 2000

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})