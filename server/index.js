import express from "express";
import mongodb from "mongodb";
import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

const MONGODB_URL = "mongodb://localhost:27017";
const PORT = 1337;

// Configuring the MongoClient to talk to MongoDB
const mongoClient = new mongodb.MongoClient(MONGODB_URL);
// Connecting the client to the database
mongoClient.connect();
// Grabbing the shop database
const db = mongoClient.db("testshop");
// Picking out the products collection
const collection = db.collection("products");

const app = express();

app.use(
    cors({
      origin: "http://localhost:3000",
    })
);
app.use(express.json());

app.get("/items", async (request, response) => {
    const items = await collection.find().toArray();
    response.json(items);
});

app.listen(PORT, () => {
    console.log(`Shop is up and running @ http://localhost:${PORT}`);
});
  