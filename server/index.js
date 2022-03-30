import express from "express";
import mongodb, { ObjectId } from "mongodb";
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

app.delete("/carts/:cartId", async (req, res) => {
  const selectedCartId = req.params.cartId;

  if(await cartCollection.count({_id: selectedCartId}) != 0) {
    cartCollection.deleteOne({_id: selectedCartId});
    res.sendStatus(200);
  } else {
    res.sendStatus(404).send("no cart with that ID");
  }
})

app.get("/items/:itemId", async (request, response) => {
    const itemId = request.params._id;
  
    const item = await collection.findOne({ _id: itemId });
  
    if (item) {
      response.json(item);
    } else {
      response.sendStatus(404);
    }
  });

//GET one cart
app.get("/carts/:cartId", async (request, response) => {
    const cartId = request.params.cartId;
  
    const cart = await cartCollection.findOne({ _id: ObjectId(cartId)});
  
    if (cart) {
      response.json(cart);
    } else {
      response.sendStatus(404);
    }
  });

//Put to cart
app.put("/carts/:cartId", async (req, res) => {
    const selectedCartId = req.params.cartId;
    const reqBody = req.body;
    console.log("test1");
  console.log("putting: ", reqBody);
    if(await cartCollection.count({_id: ObjectId(selectedCartId)}) != 0) {
      console.log("123");
      delete reqBody._id;
      await cartCollection.updateOne({_id: ObjectId(selectedCartId)}, { $set: reqBody });
      res.sendStatus(200);
    } else {
      res.sendStatus(404).send("No cart with that ID");
    }
});

// add one cart
app.post("/carts", async (request, response) => {
    const cartItem = request.body;
    let result = await cartCollection.insertOne(cartItem);

    response.send(result.insertedId);
});

//

app.listen(PORT, () => {
    console.log(`ShopAPI is up and running @ http://localhost:${PORT}`);
});
  