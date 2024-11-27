import { ConnectToDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const body = await req.json(); 
    const {email, itemId } = body;
    console.log(itemId);
    

  try {
    
    const client = await ConnectToDb();
    const db = client.db("MyShoppe");
    const cartCollection = db.collection("Users");

    const user = await cartCollection.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const result = await cartCollection.updateOne(
      { email: email }, 
      { $pull: { cart: { id: itemId } } } // Pull item from cart array by id
    );


    
   if(result.modifiedCount>0){
    client.close();

   
    return NextResponse.json({ message: "Item removed successfully!" }, { status: 200 });
   }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database operation failed!" }, { status: 500 });
  }
}
