import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


export default client;


