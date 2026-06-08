import { Request,Response } from "express";
import { cSlot,uSlot,slot } from "../models";
import pool from '../db'
export const createSlot=async (req:Request,res:Response)=>{
    const client=await pool.connect()
    try{
        await client.query("begin")
        const id=Number(req.params.id)
        const {interviewer_id,start_time,end_time}:cSlot=req.body;
        const j=await client.query(`select * from users where id=$1`,[id])
        if(j.rows[0].role==="candidate"){
            await client.query("rollback")
            return res.status(404).json({message:"user not allowed"})
        }
        const k=await client.query(`select * from users where id=$1`,[interviewer_id])
        if(k.rows[0].role==='candidate'){
            await client.query("rollback")
            return res.status(404).json({message:"user not allowed"})
        }
        const r=await client.query<slot>(`insert into slots(interviewer_id,start_time,end_time,is_booked) values($1,$2,$3,$4) returning *`,[interviewer_id,start_time,end_time,"no"])
        await client.query("commit")
        return res.status(201).json(r.rows[0])
    }
    catch(err:any){
        await client.query("rollback")
        return res.status(500).json({message:err.message})
    }
    finally{
        client.release()
    }
}
export const getByIdSlot=async (req:Request,res:Response)=>{
    const id=Number(req.params.id)
    try{
        const r=await pool.query(`select * from slots where id=$1`,[id])
        return res.status(200).json(r.rows[0])
    }
    catch(err:any){
        return res.status(500).send({message:err.message})
    }
}
export const getByIid=async (req:Request,res:Response)=>{
    const interviewer_id=Number(req.params.interviewer_id)
    const client=await pool.connect()
    try{
        await client.query("begin")
        const j=await client.query(`select * from users where id=$1`,[interviewer_id])
        if(j.rows.length===0){
            return res.status(404).json({message:"not found"})
        }
        const r=await client.query(`select * from slots s join users u on s.interviewer_id=u.id where s.interviewer_id=$1`,[interviewer_id])
        return res.status(200).json(r.rows)
    }
    catch(err:any){
        return res.status(500).send({message:err.message})
    }
    finally{
        client.release()
    }
}
export const getByStatus=async (req:Request,res:Response)=>{
    const status=req.params.status
    try{
        const r=await pool.query(`select * from slots where is_booked=$1`,[status])
        return res.status(200).json(r.rows)
    }
    catch(err:any){
        return res.status(500).json({message:err.message})
    }
}
export const uptInterviewer=async (req:Request,res:Response)=>{
    const client=await pool.connect()
    const id=Number(req.params)
    const {interviewer_id}:uSlot=req.body
    try{
        await client.query("begin")
        const j=await client.query(`select * from users where id=$1`,[interviewer_id])
        if(j.rows[0].role==="candidate"){
            await client.query("rollback")
            return res.status(404).json({message:"invalid"})
        }
        const r=await client.query(`update slots set interviewer_id=$2 where id=$1 returning *`,[id,interviewer_id])
        await client.query("commit")
        return res.status(200).json(r.rows[0])
    }
    catch(err:any){
        await client.query("rollback")
        return res.status(500).json({error:err.message})
    }
    finally{
        client.release()
    }
}