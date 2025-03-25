import mongoose from "mongoose";

const connectDB = async () => {
    try{
     await mongoose.connect(process.env.MONGO_URL)
     console.log('Connection to Db')
    }catch(error){
      console.log('Not Connection')

    }
}
export default connectDB