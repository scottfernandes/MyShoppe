import { MongoClient } from "mongodb";

export async function ConnectToDb() {
    const client = await MongoClient.connect('mongodb://localhost:27017')
    
    return client
}