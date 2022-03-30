import express from "express";
import mongodb from "mongodb";
import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

const MONGODB_URL = "mongodb://localhost:27017";
const PORT = 1337;

const mongoClient = new mongodb.MongoClient(MONGODB_URL);
mongoClient.connect();

//DIFFERENT ENDPOINTS
const db = mongoClient.db("testshop");
const productCollection = db.collection("products");
const cartCollection = db.collection("cart");

const app = express();
app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:3000",
    })
);


// GET PRODUCTS
// When we send a get request to "/items" we are returned a json object of the items.
app.get("/items", async (request, response) => {
    const items = await productCollection.find().toArray();
    response.json(items);
});

app.get("/items/:itemId", async (request, response) => {
    const itemId = request.params._id;
  
    const item = await collection.findOne({ _id: itemId });
  
    if (item) {
      response.json(item);
    } else {
      response.sendStatus(404);
    }
  });

//GET cart
app.get("/carts/:cartId", async (request, response) => {
    const cartId = request.params._id;
  
    const cart = await collection.findOne({ _id: cartId });
  
    if (cart) {
      response.json(cart);
    } else {
      response.sendStatus(404);
    }
  });

// POST shit to cart
app.post("/cart", async (request, response) => {
    const cartItem = request.body;

    await cartCollection.insertOne(cartItem);

    response.status(200).end();
});

app.listen(PORT, () => {
    console.log(`Shop is up and running @ http://localhost:${PORT}`);
});
  