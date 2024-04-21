import {useContext, useState} from "react";
import {CartContext} from "../contexts/CartContext";
import {createPayment} from "../services/payment.js";

const Cart = () => {
    const {cart, removeFromCart, clearCart} = useContext(CartContext);
    const [showBlikForm, setShowBlikForm] = useState(false);
    const [blikCode, setBlikCode] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    const handleClearCart = () => {
        clearCart();
    };

    const handlePay = () => {
        setShowBlikForm(true);
    };

    const handleSubmitBlik = (e) => {
        e.preventDefault();
        createPayment({blik: blikCode, cart: cart})
            .then(payment => {
                setBlikCode('');
                setShowBlikForm(false);
                setError('');
                setMessage(`Payment completed successfully: ${payment.total}`);
                clearCart();
            })
            .catch(error => setError(error));
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
            {cart.length === 0 ? (
                <p className="text-lg">Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map(product => (
                        <div key={product.id} className="flex items-center justify-between border-b-2 py-4">
                            <div>
                                <h2 className="text-xl font-bold">{product.name}</h2>
                                <p className="text-gray-600">${product.price} (x{product.quantity})</p>
                            </div>
                            <div>
                                <button onClick={() => handleRemoveFromCart(product.id)} className="text-red-500 mr-4">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-8 flex justify-between">
                        <button onClick={handleClearCart} className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4">
                            Clear Cart
                        </button>
                        <button onClick={handlePay} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4">
                            Pay
                        </button>
                    </div>
                    {showBlikForm && (
                        <form onSubmit={handleSubmitBlik} className="mt-8">
                            <input
                                type="text"
                                value={blikCode}
                                onChange={(e) => setBlikCode(e.target.value)}
                                placeholder="Enter BLIK code"
                                className="border border-gray-300 rounded-lg p-2 mr-4"
                            />
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
                                Confirm Payment
                            </button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </form>
                    )}
                </div>
            )}
            {message && <p className="text-green-500 mt-2">{message}</p>}
        </div>
    );
};

export default Cart;