import React, { useEffect, useState } from "react";
import { Suspense } from 'react';
import {
    useRouteLoaderData,
    json,
    redirect,
    defer,
    Await,
    useNavigate,
    useParams
} from 'react-router-dom';
import axios from "axios";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
    const { product } = useRouteLoaderData('product-detail');
    const { id } = useParams();
    const navigate = useNavigate(); 

  

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5227/api/products/${id}`);
            alert("Product deleted successfully!");
            navigate("/"); // Redirect to the home page after deletion
        } catch (err) {
            alert("Failed to delete the product."); // Show an alert in case of failure
        }
    };

    const handleEdit = () => {
        navigate(`/product/${id}/edit`); // Redirect to the edit product page
    };


    if (!product) {
        return <p>No product found.</p>;
    }

    return (
        <>
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={product}>
                    <div className={styles.productDetailCard}>
                        <h2 className={styles.productName}>{product.productName}</h2>
                        <p className={styles.productID}>Product ID: {product.productID}</p>
                        <p className={styles.productPrice}>Price: ${product.price.toFixed(2)}</p>
                        <p className={styles.productQuantity}>Quantity Available: {product.quantity}</p>
                        <p className={styles.productTags}>Tags: {product.tags}</p>
                        {product.categories.length > 0 && (
                            <div className={styles.categories}>
                                Categories:
                                {product.categories.map((category, index) => (
                                    <span key={index} className={styles.categoryBadge}>
                                        {category}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className={styles.buttonContainer}>
                            <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>
                            <button className={styles.editButton} onClick={handleEdit}>Edit</button>
                        </div>
                    </div>
        </Await>
      </Suspense>
        </>
       
    );
};

export default ProductDetail;

const loadProduct = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5227/api/products/${id}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export async function loader({ request, params }) {
    const id = params.id;
    return defer({
        product: await loadProduct(id),
 
    });
}