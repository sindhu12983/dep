import express from "express";
import {request,response} from "express"
import userRouter from "./routes/users"
import interviewRouter from "./routes/interviews";
import slotRouter from "./routes/slots";
import { createTables } from "./db";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from './swagger';
const app=express()
const start=async ()=>{
    await createTables()}
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json())
app.use("/users",userRouter)
app.use("/interviews",interviewRouter)
app.use("/slots",slotRouter)
app.listen(3000,()=>{console.log("...running")})
start();

