import { ConnectToDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const client = await ConnectToDb();
    const db = client.db("MyShoppe");
    const cartCollection = db.collection("Users");

    const user = await cartCollection.findOne(
      { email: email },
      { projection: { cart: 1 } }
    );

    if (!user) {
      client.close();
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    client.close();
    return NextResponse.json({ cartItems: user.cart || [], status: 200 });
  } catch (err) {
    console.error("Error retrieving cart items:", err);
    return NextResponse.json(
      { error: "Database operation failed!" },
      { status: 500 }
    );
  }
}
