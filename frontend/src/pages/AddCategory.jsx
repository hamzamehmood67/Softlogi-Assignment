import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AddCategory.module.css'; // Import CSS module

function AddCategory() {
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5227/api/Categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    categoryName: categoryName,
                }),
            });

            if (response.ok) {
                navigate('/categories');
            } else {
                console.error('Failed to add category');
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div>
            <h1>Add New Category</h1>
            <form onSubmit={handleSubmit} className={classes.form}>
                <div>
                    <label htmlFor="categoryName">Category Name</label>
                    <input
                        id="categoryName"
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
}

export default AddCategory;
