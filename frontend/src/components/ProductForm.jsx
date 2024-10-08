import React, { useEffect, useState } from "react";
import {
    Form,
    useNavigate,
    useNavigation,
    useActionData,
    json,
    redirect
} from 'react-router-dom';
import classes from './ProductForm.module.css';

function ProductForm({ method, product }) {
    const [categories, setCategories] = useState([]); // To store fetched categories
    const [selectedCategories, setSelectedCategories] = useState(product ? product.categories : []); // To store selected categories

    const data = useActionData();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    // Fetch categories from API when component loads
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5227/api/Categories');
                const data = await response.json();
              
                setCategories(data); // Set the fetched categories
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryChange = (categoryId) => {
       
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(categoryId)) {
                return prevSelected.filter((id) => id !== categoryId); // Remove category if already selected
            } else {
                return [...prevSelected, categoryId]; // Add category if not already selected
            }
        });
    };

    const cancelHandler = () => {
        navigate('..'); // Navigate back to the previous page
    };
    return (
        <Form method={method} className={classes.form}>
            {data && data.errors && (
                <ul>
                    {Object.values(data.errors).map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            )}
            <p>
                <label htmlFor="productName">Product Name</label>
                <input
                    id="productName"
                    type="text"
                    name="productName"
                    required
                    defaultValue={product ? product.productName : ''}
                />
            </p>
            <p>
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    type="number"
                    name="price"
                    required
                    step="0.01"
                    defaultValue={product ? product.price : ''}
                />
            </p>
            <p>
                <label htmlFor="quantity">Quantity</label>
                <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    required
                    defaultValue={product ? product.quantity : ''}
                />
            </p>
            <p>
                <label htmlFor="tags">Tags</label>
                <input
                    id="tags"
                    type="text"
                    name="tags"
                    required
                    defaultValue={product ? product.tags : ''}
                />
            </p>
            <div>
                <label>Categories</label>
                <div className={classes.checkboxGroup}>
                    {categories.map((category) => (
                        <div key={category.categoryID} className={classes.checkboxItem}>
                            <input
                                type="checkbox"
                                id={`category-${category.categoryID}`}
                                value={category.categoryID}
                                checked={selectedCategories.includes(category.categoryID)}
                                onChange={() => handleCategoryChange(category.categoryID)}
                            />
                            <label htmlFor={`category-${category.categoryID}`}>{category.categoryName}</label>
                        </div>
                    ))}
                </div>
            </div>
            {selectedCategories.map((categoryId) => (
                <input
                    key={categoryId}
                    type="hidden"
                    name="categories"
                    value={categoryId}
                />
            ))}
            <div className={classes.actions}>
                <button className={classes.cancel} type="button" onClick={cancelHandler} disabled={isSubmitting}>
                    Cancel
                </button>
                <button className={classes.save} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Save'}
                </button>
            </div>
        </Form>
    );
}

export default ProductForm;

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();

    const productData = {
        productName: data.get('productName'),
        price: parseFloat(data.get('price')),
        quantity: parseInt(data.get('quantity')),
        tags: data.get('tags'),
        categories: data.getAll('categories')
        
    };
  
    let url = 'http://localhost:5227/api/products'; // Adjust to your API endpoint

    if (method === 'PUT') {
        const productId = params.id; // Adjust parameter name based on your routing
        url = `http://localhost:5227/api/products/${productId}`; // Adjust to your API endpoint
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });

    if (response.status === 422) {
        return response; // Handle validation errors
    }

    if (!response.ok) {
        throw json({ message: 'Could not save product.' }, { status: 500 });
    }

    return redirect('/'); // Adjust to your products page URL
}
