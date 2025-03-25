import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import morgan from 'morgan'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'

const app = express()
const PORT = process.env.PORT || 4000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//api endpoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res) => {
    res.send('API Working')
})

app.listen(PORT,() =>  console.log('Server start'))