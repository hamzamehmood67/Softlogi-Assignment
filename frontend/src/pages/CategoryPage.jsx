import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CategoryItem from '../components/CategoryItem';
import classes from './CategoryPage.module.css';
import axios from 'axios';

function CategoryPage() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5227/api/Categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Handler for adding a new category
    const handleAddCategory = () => {
        navigate('new'); 
    };

    // Delete category function
    async function deleteCategory(id) {
        try {
            await axios.delete(`http://localhost:5227/api/Categories/${id}`); 
            alert("Category deleted successfully!");
        
            setCategories((prevCategories) =>
                prevCategories.filter((category) => category.categoryID !== id)
            );
        } catch (err) {
            alert("Failed to delete the category."); 
        }
    }

    return (
        <div className={classes.pageContainer}>
            <h1 className={classes.pageHeader}>All Categories</h1>
            <ul className={classes.categoryList}>
                {categories.length === 0 && <p className={classes.noCategoriesMessage}>No categories found.</p>}
                {categories.map((c) => (
                    <CategoryItem onDelete={deleteCategory} key={c.categoryID} category={c} />
                ))}
            </ul>
            <button className={classes.addCategoryButton} onClick={handleAddCategory}>
                Add New Category
            </button>
        </div>
    );
}

export default CategoryPage;
