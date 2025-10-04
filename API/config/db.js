import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if(!process.env.MONGODB_URL) {
            throw new Error('MONGODB_URL not defined in .env file')
        }
        const mongoConn = await mongoose.connect(process.env.MONGODB_URL,{
            dbName:'userInfo'
        })
        console.log(`mongodb now connected: ${mongoConn.connection.host}`)
    } catch (error) {
        console.error(`mongodb connection failed : ${error.message}`)
    }
    mongoose.connection.on('disconnected',()=> {
        console.warn('mongodb connection is now disconnected')
    })
}

export default connectDB