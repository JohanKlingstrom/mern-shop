import { Router } from "express";
import { Db } from "mongodb";

//GET PRODUCTS
const getAllProduct = (db) => async (request, response) => {
    const items = await db.collection("products").find().toArray();
    res.json(items);

}


export function productsRoute(db) {
    const router = new Router();
    router.get("/products", getAllProduct(db));
    return router;
}