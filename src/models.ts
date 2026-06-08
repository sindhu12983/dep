export interface cUser{
    name:string;
    email:string;
    password:string;
    role:string;

}
export interface uUser{
    id:number;
    password?:string;
    role?:string;
}
export interface user{
    id:number,
    name:string;
    email:string;
    password:string;
    role:string;
    created_at:string;
}
export interface cSlot{
    interviewer_id:number;
    start_time:string;
    end_time:string;
}
export interface uSlot{
    interviewer_id:number;
}
export interface slot{
    id:number;
    interviewer_id:number;
    start_time:string;
    end_time:string;
    is_booked:string;
    created_at:string;
}
export interface cInterview{
    slot_id:number;
    status:string;
}
export interface uInterview{
    id?:number;
    slot_id?:number;
    status:string;
}
export interface interview{
    id:number;
    candidate_id:number;
    slot_id:number;
    status:string;
    created_at:string;
}