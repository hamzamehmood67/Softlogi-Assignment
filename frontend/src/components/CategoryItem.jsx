import React from 'react';
import classes from './CategoryItem.module.css'; // Import CSS module

function CategoryItem({ category, onDelete }) {
    // Call the onDelete handler passed from the parent component when the delete button is clicked
    const handleDelete = () => {
        onDelete(category.categoryID); // Pass the category ID to the onDelete handler
    };

    return (
        <li className={classes.categoryItem}>
            <span>{category.categoryName}</span>
            <button onClick={handleDelete} className={classes.deleteButton}>Delete</button>
        </li>
    );
}

export default CategoryItem;
