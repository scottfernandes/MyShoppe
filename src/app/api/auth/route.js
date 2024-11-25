import { hashPass } from "@/lib/auth";
import { ConnectToDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {

    if(req.method!='POST'){
        console.log('ok');
        
    }
    const data =await req.json()
    console.log(data);
    
    const {name,email,password} = data
    console.log(name,email,password);
    

    if(!name || !email || !email.includes('@')|| !password || password.trim().length < 7 ){
       return NextResponse.json({message:"Error"},{status:404})
        
    }

    const client = await ConnectToDb()

    const db = client.db('MyShoppe')

    const collection = db.collection('Users')

    const existingUser = await collection.findOne({email:email})

    if(existingUser){
        return NextResponse.json({error:"Email Already exists!"})
    }
    const hashedPass = await hashPass(password)
    const result = await collection.insertOne({
        name:name,
        email:email,
        password:hashedPass
    })

    return NextResponse.json({message:"Created User!"})

}