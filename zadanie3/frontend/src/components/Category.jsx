import React, {useEffect, useState} from "react";
import {getCategory} from "../services/categories.js";
import {createProduct, deleteProduct, getProducts, updateProduct} from "../services/products.js";
import {Link, useParams} from "react-router-dom";
import {FaPen, FaSave} from "react-icons/fa";
import {IoTrashBin} from "react-icons/io5";

const Category = () => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([])
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({});
    const [createError, setCreateError] = useState('');
    const [error, setError] = useState('');

    const {categoryId} = useParams();

    useEffect(() => {
        getCategory(categoryId)
            .then(data => {
                setCategory(data);
                setError('');
            })
            .catch(error => setError(error));
    }, []);

    useEffect(() => {
        getProducts(categoryId)
            .then(data => {
                setProducts(data);
                setError('');
            })
            .catch(error => setError(error));
    }, []);

    const handleDeleteProduct = (productId) => {
        deleteProduct(productId)
            .then(() => {
                setProducts(products.filter(prod => prod.id !== productId));
                setError('');
            })
            .catch(error => setError(error));
    };

    const handleAddProduct = (categoryId) => {
        createProduct(categoryId, {name: newProductName, price: newProductPrice})
            .then(newProduct => {
                setProducts([...products, newProduct]);
                setNewProductName('');
                setNewProductPrice(0)
                setCreateError('');
            })
            .catch(error => setCreateError(error));
    };

    const handleEditProduct = (product) => {
        setEditedProduct(product);
        setIsEditing(true);
    };

    const handleSaveProduct = () => {
        updateProduct(editedProduct.id, editedProduct)
            .then((updatedProduct) => {
                const updatedProducts = products.map(prod =>
                    prod.id === updatedProduct.id ? updatedProduct : prod
                );
                setProducts(updatedProducts);
                setIsEditing(false);
                setError('');
            })
            .catch(error => setError(error));
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">{category.name}</h1>
            <hd className="text-2xl font-bold text-gray-800 mb-4">{category.description}</hd>
            {error && <p className="text-lg text-red-500">{error}</p>}

            <ul className="p-5 flex flex-col items-center w-full">
                {products.length > 0 ? (
                    products.map(product => (
                        <li key={product.id}
                            className="container bg-gray-100 p-3 rounded-lg flex text-center mb-3 relative">
                            {isEditing && editedProduct.id === product.id ? (
                                <div className="w-full flex items-center justify-between">
                                    <input
                                        type="text"
                                        value={editedProduct.name}
                                        onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
                                        className="w-1/5 p-2 ml-4 border border-gray-300 rounded-lg"
                                        placeholder="Name"
                                    />
                                    <input
                                        type="number"
                                        value={editedProduct.price}
                                        onChange={(e) => setEditedProduct({
                                            ...editedProduct,
                                            price: parseFloat(e.target.value)
                                        })}
                                        className="w-4/5 p-2 ml-4 me-4 border border-gray-300 rounded-lg"
                                        placeholder="Price"
                                    />
                                    <button onClick={handleSaveProduct} className="w-10 ml-4 me-4 text-green-500">
                                        <FaSave size={25}/>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to={`/categories/${category.id}/products/${product.id}`} className="w-1/5"
                                          title={product.name}>
                                        <h2 className="text-lg font-bold">{product.name}</h2>
                                    </Link>
                                    <div className="w-4/5">
                                        <p className="text-gray-600">{product.price}</p>
                                    </div>
                                    <div className="w-10 ml-4 me-4 text-blue-500">
                                        <FaPen size={25} onClick={() => handleEditProduct(product)}/>
                                    </div>
                                    <div className="w-10 ml-4 me-4 text-red-500">
                                        <IoTrashBin size={25} onClick={() => handleDeleteProduct(product.id)}/>
                                    </div>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <li className="text-2xl">No products found</li>
                )}
            </ul>

            <div className="mt-4 pl-5 pr-5 container rounded-lg text-center mb-3 relative">
                <p className="text-2xl text-gray-800 mb-4 px-4 py-2">Add New Product</p>
                {createError && <p className="text-lg text-red-500">{createError}</p>}
                <div className="mt-4 w-full flex items-center justify-between">
                    <input type="text" value={newProductName} onChange={(e) => setNewProductName(e.target.value)}
                           placeholder="Name"
                           className="border border-gray-300 rounded-lg px-4 py-2 mr-2 w-1/5"/>
                    <input type="number" value={newProductPrice}
                           onChange={(e) => setNewProductPrice(parseFloat(e.target.value))}
                           placeholder="Price"
                           className="border border-gray-300 rounded-lg px-4 py-2 mr-2 w-4/5"/>
                    <button onClick={() => handleAddProduct(categoryId)} className="text-green-500">
                        <FaSave size={30}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Category;