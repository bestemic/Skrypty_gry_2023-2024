import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {createCategory, deleteCategory, getCategories, updateCategory} from '../services/categories';
import {FaPen, FaSave} from "react-icons/fa";
import {IoTrashBin} from "react-icons/io5";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedCategory, setEditedCategory] = useState({});
    const [createError, setCreateError] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        getCategories()
            .then(data => {
                setCategories(data);
                setError('');
            })
            .catch(error => setError(error));
    }, []);

    const handleDeleteCategory = (categoryId) => {
        deleteCategory(categoryId)
            .then(() => {
                setCategories(categories.filter(cat => cat.id !== categoryId));
                setError('');
            })
            .catch(error => setError(error));
    };

    const handleAddCategory = () => {
        createCategory({name: newCategoryName, description: newCategoryDescription})
            .then(newCategory => {
                setCategories([...categories, newCategory]);
                setNewCategoryName('');
                setNewCategoryDescription('');
                setCreateError('');
            })
            .catch(error => setCreateError(error));
    };

    const handleEditCategory = (category) => {
        setEditedCategory(category);
        setIsEditing(true);
    };

    const handleSaveCategory = () => {
        updateCategory(editedCategory.id, editedCategory)
            .then((updatedCategory) => {
                const updatedCategories = categories.map(cat =>
                    cat.id === updatedCategory.id ? updatedCategory : cat
                );
                setCategories(updatedCategories);
                setIsEditing(false);
                setError('');
            })
            .catch(error => setError(error));
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">Categories</h1>
            {error && <p className="text-lg text-red-500">{error}</p>}

            <ul className="p-10 flex flex-col items-center w-full">
                {categories.length > 0 ? (
                    categories.map(category => (
                        <li key={category.id}
                            className="container bg-gray-100 p-3 rounded-lg flex text-center mb-3 relative">
                            {isEditing && editedCategory.id === category.id ? (
                                <div className="w-full flex items-center justify-between">
                                    <input
                                        type="text"
                                        value={editedCategory.name}
                                        onChange={(e) => setEditedCategory({...editedCategory, name: e.target.value})}
                                        className="w-1/5 p-2 ml-4 border border-gray-300 rounded-lg"
                                        placeholder="Name"
                                    />
                                    <input
                                        type="text"
                                        value={editedCategory.description}
                                        onChange={(e) => setEditedCategory({
                                            ...editedCategory,
                                            description: e.target.value
                                        })}
                                        className="w-4/5 p-2 ml-4 me-4 border border-gray-300 rounded-lg"
                                        placeholder="Description"
                                    />
                                    <button onClick={handleSaveCategory} className="w-10 ml-4 me-4 text-green-500">
                                        <FaSave size={25}/>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to={`/categories/${category.id}`} className="w-1/5" title={category.name}>
                                        <h2 className="text-lg font-bold">{category.name}</h2>
                                    </Link>
                                    <div className="w-4/5">
                                        <p className="text-gray-600">{category.description}</p>
                                    </div>
                                    <div className="w-10 ml-4 me-4 text-blue-500">
                                        <FaPen size={25} onClick={() => handleEditCategory(category)}/>
                                    </div>
                                    <div className="w-10 ml-4 me-4 text-red-500">
                                        <IoTrashBin size={25} onClick={() => handleDeleteCategory(category.id)}/>
                                    </div>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <li className="text-2xl">No categories found</li>
                )}
            </ul>

            <div className="mt-4 container p-10 rounded-lg text-center mb-3 relative">
                <p className="text-2xl text-gray-800 mb-4 px-4 py-2">Add New Category</p>
                {createError && <p className="text-lg text-red-500">{createError}</p>}
                <div className="mt-4 w-full flex items-center justify-between">
                    <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)}
                           placeholder="Name"
                           className="border border-gray-300 rounded-lg px-4 py-2 mr-2 w-1/5"/>
                    <input type="text" value={newCategoryDescription}
                           onChange={(e) => setNewCategoryDescription(e.target.value)}
                           placeholder="Description"
                           className="border border-gray-300 rounded-lg px-4 py-2 mr-2 w-4/5"/>
                    <button onClick={handleAddCategory} className="text-green-500">
                        <FaSave size={30}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Categories;