import React, { useEffect, useState } from "react";

function Checkout() {
    const [cart, setCart] = useState([]);

    useEffect(async () => {
        let cartId = localStorage.getItem("cart");
        let response = await fetch(`http://localhost:1337/carts/${cartId}`, {
            method: "GET",
    }); setCart(await response.json());
    }, [])
    
    // const cartList = cart.products.map((item) => <ItemCard item={item} key={item.id} />)

    return ( 
        <div>
            <h1>Checkout</h1>
        </div>
    )
}

export default Checkout;