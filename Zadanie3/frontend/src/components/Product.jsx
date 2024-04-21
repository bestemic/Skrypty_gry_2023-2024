import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getProduct} from "../services/products.js";
import {CartContext} from "../contexts/CartContext.jsx";

const Notification = ({ message }) => {
    return (
        <div className="fixed bottom-0 right-0 bg-green-500 text-white p-4 mb-4 mr-4 rounded-lg">
            {message}
        </div>
    );
};

const Product = () => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const {productId} = useParams();
    const {addToCart} = useContext(CartContext);

    useEffect(() => {
        getProduct(productId)
            .then(data => {
                setProduct(data);
                setError('');
            })
            .catch(error => setError(error));
    }, []);

    const handleAddToCart = () => {
        addToCart(product);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                {error && <p className="text-lg text-red-500">{error}</p>}
                <h1 className="text-5xl font-bold text-gray-800 mb-4">{product.name}</h1>
                <hd className="text-2xl font-bold text-gray-800 mb-4">{product.price}$</hd>

                <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Add to Cart
                </button>
            </div>

            {showNotification && <Notification message="Product added to cart!" />}

        </div>
    );
};

export default Product;