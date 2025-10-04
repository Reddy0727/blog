import express from 'express';
import 'dotenv/config'
import connectDB from './config/db.js';
import userRouter from './routers/user.router.js'

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json())

app.use('api/user',userRouter)
app.get('/health',(req,res)=>{
    res.status(200).json({
        status:'ok',
        uptime:process.uptime(),
        timestamp:new Date().toISOString()
    })
})

app.listen(port,()=>{
    console.log(`server running on ${port}`)
    connectDB()
})

process.on('SIGINT',()=>{
    console.log(`server shutdown`);
    process.exit(0);
});