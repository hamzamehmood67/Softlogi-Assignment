import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import styles from './Home.module.css';
import {Link } from 'react-router-dom'
export default function Home() {
   
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

   
    useEffect(() => {
        axios.get("http://localhost:5227/api/products")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    
    const filteredProducts = products.filter(product => {
       
        const matchesName = product.productName.toLowerCase().includes(searchQuery.toLowerCase());

       
        const tags = product.tags.split(",").map(tag => tag.trim().toLowerCase()); 
        const matchesTags = tags.some(tag => tag.includes(searchQuery.toLowerCase()));

       
        return matchesName || matchesTags;
    });

   
    return (
        <div className={styles.home}>
            <h1>Products List</h1>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Search by product name, tags"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.input} 
                />
            </div>
            {filteredProducts.length === 0 ? (
                <p className={styles.noProducts}>No products available.</p>
            ) : (
                <ul className={styles.productList}>
                    {filteredProducts.map(p => (
                        <li key={p.productID} className={styles.productCard}>
                            <Link to={'/product/' + p.productID}> <ProductItem product={p} /></Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
