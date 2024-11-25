import { ConnectToDb } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { itemId } = req.body;

    try {
      const client = await ConnectToDb();
      const db = client.db("myshoppe");
      const cartCollection = db.collection("cart");

      await cartCollection.deleteOne({ id: itemId });

      client.close();
      res.status(200).json({ message: "Item removed successfully!" });
    } catch (err) {
      res.status(500).json({ error: "Database operation failed!" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed!" });
  }
}
