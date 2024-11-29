import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoute.js";

const app =express()
app.use(cors({
    // origin: ["http://localhost:5173"],
    origin: ["https://singh-hrms-pb96-1rq4nnt30-anuj-singhs-projects-59a76acf.vercel.app/?vercelToolbarCode=G4dEUZ0lHHls_se"],
    method: ['GET','POST','PUT'],
    credentials: true
}))
app.use(express.json())
app.use('/auth', adminRouter)

app.listen(3000,() =>{
    console.log("Server is runing")
})