import { Request,Response } from "express";
import { pool } from '../db'
import { PoolClient } from "pg";
import { cInterview,uInterview,interview } from "../models";
export const createInterview=async (req:Request,res:Response)=>{
    const client=await pool.connect()
    try{
        await client.query("begin")
    if(req.body.id){
        const l=await changeInterview(req.body,Number(req.params.user_id),client)
        await client.query("commit")
        return res.status(200).json(l)}
    else{
           const {slot_id,status}:cInterview=req.body;
           const candidate_id=Number(req.params.user_id)
           const k=await client.query(`select * from slots where id=$1`,[slot_id])
           if(k.rows[0].is_booked==='yes'){
            await client.query("rollback")
            return res.status(404).json({message:"not available"})
           }
           const r=await client.query<interview>(`insert into interviews(candidate_id,slot_id,status) values($1,$2,$3) returning *`,[candidate_id,slot_id,status])
           await client.query(`update slots set is_booked='yes' where id=$1`,[slot_id])
           await client.query("commit")
           return res.status(200).json(r.rows[0])
    }
}
catch(err:any){
   await client.query("rollback")
   return res.status(500).json({message:err.message})
}
finally{
    client.release()
}
}
export const changeInterview=async (body:uInterview,cand_id:number,client:PoolClient)=>{
    try{
        if(body.status==="rescheduled"){
            const {id,slot_id,status}:uInterview=body;
            const b=await client.query(`select * from interviews where id=$1 and candidate_id=$2`,[id,cand_id])
            if(b.rows.length===0)
            {
                throw new Error("not found")
            }
            const l=await client.query(`select * from slots where id=$1`,[slot_id])
            if(l.rows[0].is_booked==='yes'){
                throw new Error("slot not available")
            }
            const j=await client.query(`select * from interviews where id=$1`,[id])
            const r=await client.query(`update interviews set slot_id=$1,status=$2 where id=$3 returning *`,[slot_id,status,id])
            await client.query(`update slots set is_booked='yes' where id=$1 returning *`,[slot_id])
            await client.query(`update slots set is_booked='no' where id=$1 returning *`,[j.rows[0].slot_id])
            return r.rows[0]       
        }
        else{
            const {id,status}:uInterview=body;
            const l=await client.query(`select * from interviews where id=$1`,[id])
            await client.query(`update slots set is_booked='no' where id=$1 returning *`,[l.rows[0].slot_id])
            const r=await client.query(`update interviews set status=$1 where id=$2 returning *`,[status,id])
            return r.rows[0]
        }
      }
      catch(err:any){
        throw new Error(err.message)
      }
}
export const getByIdInterview=async (req:Request,res:Response)=>{
    const id=Number(req.params.user_id)
    try{
        const r=await pool.query(`select * from interviews where id=$1`,[id])
        if(r.rows.length===0){
            return res.status(404).json({message:"not found"})
        }
        return res.status(200).json(r.rows[0])
    }
    catch(err:any){
        return res.status(500).json({error:err.message})
    }
}
export const getByCandidate_id=async (req:Request,res:Response)=>{
    const id=Number(req.params.candidate_id)
    try{
        const r=await pool.query(`select * from interviews where candidate_id=$1`,[id])
        if(r.rows.length===0){
            return res.status(404).json({message:"not found"})
        }
        return res.status(200).json(r.rows)
    }
    catch(err:any){
        return res.status(500).json({error:err.message})
    }
}
export const getByInterviewer_id=async (req:Request,res:Response)=>{
    const id=Number(req.params.interviewer_id)
    try{
        const r=await pool.query(`select * from interviews i join slots s on i.slot_id=s.id where interviewer_id=$1`,[id])
        if(r.rows.length===0){
            return res.status(404).json({message:"not found"})
        }
        return res.status(200).json(r.rows)
    }
    catch(err:any){
        return res.status(500).json({error:err.message})
    }
}
