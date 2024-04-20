import {Link, Outlet} from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            <nav className="bg-gray-800 p-4 w-full">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-white font-semibold text-xl">Shop</Link>
                    <div>
                        <Link to="/categories" className="text-white mr-4">Categories</Link>
                        <Link to="/cart" className="text-white">Cart</Link>
                    </div>
                </div>
            </nav>

            <div className="p-10 flex flex-col items-center w-full">
                <div className="container p-8 bg-gray-200 rounded-xl min-h-[80vh]">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Navigation;