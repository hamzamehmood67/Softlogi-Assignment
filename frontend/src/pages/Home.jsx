import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
export default function Home() {
    // State to store products
    const [products, setProducts] = useState([]);

    // Fetch products when the component mounts
    useEffect(() => {
        // Replace with your backend API endpoint
        axios.get("http://localhost:5227/api/products")
            .then(response => {
                setProducts(response.data); // Assuming response.data contains the list of products
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    // Render the product list
    return (
        <div>
            <h1>Products List</h1>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                    <ul>
                        {products.map(p => <Link key={p.productID} to={`/product/${p.productID}`}>
                            <ProductItem product={p} />
                        </Link>)}
                </ul>
            )}
        </div>
    );
}
