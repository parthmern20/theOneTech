import express from "express";
import adminRoutes from "./adminRoute.js"
import userRoutes from "./userRoute.js"

const app = express()

app.use('/admin', adminRoutes)
app.use('/user', userRoutes)

export default app;