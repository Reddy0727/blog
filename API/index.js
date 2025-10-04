import express from 'express';
import 'dotenv/config'
import connectDB from './config/db.js';

const app = express();
const port = process.env.PORT || 2000

app.listen(port,()=>{
    console.log(`server running on ${port}`)
    connectDB()
})