import { ConnectToDb } from "@/lib/db";
import { NextResponse } from "next/server";

export  async function POST(req) {
    const body = await req.json();

    const { email,item } = body;
    console.log(email);
        
    try {
      const client = await ConnectToDb()
      const db = client.db("MyShoppe");
      const cartCollection = db.collection("Users");

      const existingItem =  await cartCollection.findOne({
        email: email,
        cart: { $elemMatch: { id: item.id } }, 
      });

      if(existingItem){
        client.close()
        return NextResponse.json({message:"Item already exists in Cart", status:400})
      }
      else{
        await cartCollection.updateOne({email:email},{$push:{cart:item}})
        client.close();
        return NextResponse.json({ message: "Item added successfully!" ,status:200});
      }

     
    } catch (err) {
      return NextResponse.json({ error: "Database operation failed!" ,status:500});
    }
  } 

