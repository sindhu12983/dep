import {cUser,uUser,user} from '../models'
import { Request,Response } from "express"
import { pool } from '../db'
import { PoolClient } from 'pg'
export const createUser=async (req:Request,res:Response)=>{
    const client=await pool.connect()
    try{
        await client.query("begin")
    if(req.body.id){
        const l=await uptUserRole(req.body,client)
        await client.query("commit")
        return res.status(200).json(l)
    }
    else{
        const {name,email,password,role}:cUser=req.body;
        const r=await client.query<user>(`insert into users(name,email,password,role) values($1,$2,$3,$4) returning *`,[name,email,password,role])
        await client.query("commit")
        return res.status(200).json(r.rows[0])
    }

    }
    catch(err:any){
        await client.query("rollback")
        return res.status(500).json({error:err.message})
    }
    finally{
        client.release()
    }
}
export const getByUserId=async (req:Request,res:Response)=>{
    try{
        const id=Number(req.params.id)
        const r=await pool.query(`select * from users where id=$1`,[id])
        return res.status(200).json(r.rows[0])
    }
    catch(err:any){
        return res.status(500).json({error:err.message})
    }
}
export const getByRole=async (req:Request,res:Response)=>{
    try{
        const role=req.params.role
        const r=await pool.query(`select * from users where role=$1`,[role])
        return res.status(200).json(r.rows)
    }
    catch(err:any){
        return res.status(500).json({error:err.message})
    }
}
export const uptUserRole=async (body:uUser,client:PoolClient)=>{
    try{
        const {id,password,role}:uUser=body;
        const j=await client.query(`select * from users where id=$1`,[id])
        if(j.rows.length===0){
            throw new Error("User not found")
        }
        const r=await client.query(`update users set role=coalesce($2,role),password=coalesce($3,password) where id=$1 returning *`,[id,role,password])
        return r.rows[0]
    }
    catch(err:any){
        throw new Error(err.message)
    }
}
