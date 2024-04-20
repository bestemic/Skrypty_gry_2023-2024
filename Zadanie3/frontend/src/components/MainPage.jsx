const MainPage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-10 text-center">The Trendiest Clothes for You!</h1>

            <p className="text-2xl text-gray-700 mb-8 text-center">
                Discover the latest fashion trends in our store, from elegant dresses to comfortable jeans.
                Check out our collection now!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                <div className="bg-gray-300 p-8 rounded-xl">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Dresses</h2>
                    <p className="text-lg text-gray-700">
                        Explore our collection of elegant dresses that will make you feel special on every occasion.
                    </p>
                </div>
                <div className="bg-gray-300 p-8 rounded-xl">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Pants</h2>
                    <p className="text-lg text-gray-700">
                        Looking for comfortable and stylish pants? We have a wide selection that will meet your
                        expectations.
                    </p>
                </div>
                <div className="bg-gray-300 p-8 rounded-xl">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Accessories</h2>
                    <p className="text-lg text-gray-700">
                        Our accessories will add flair to your outfit. Find here bags, scarves, jewelry, and much more!
                    </p>
                </div>
            </div>

            <div className="mt-16 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Find Your Unique Style</h2>
                <p className="text-xl text-gray-700">
                    Explore our collection and discover your new look today!
                </p>
            </div>
        </div>
    );
};

export default MainPage;