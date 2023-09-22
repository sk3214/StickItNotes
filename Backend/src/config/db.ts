import mongoose, { ConnectOptions }  from 'mongoose';
import 'dotenv/config';
import env from '../utils/validateEnv'

export const connectDB  = async()=>{
try{
    const conn = await mongoose.connect(env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      } as ConnectOptions);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
}catch(error){
    console.error(`Database connection Error: ${error}`);
    process.exit();
}

}
