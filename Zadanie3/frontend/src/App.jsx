import {Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import NotFound from "./components/NotFound.jsx";
import MainPage from "./components/MainPage.jsx";
import Cart from "./components/Cart.jsx";
import Categories from "./components/Categories.jsx";
import Category from "./components/Category.jsx";

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navigation/>}>
                    <Route index element={<MainPage/>}/>
                    <Route path="categories">
                        <Route index element={<Categories/>}/>
                        <Route path=":categoryId" element={<Category/>}/>
                    </Route>
                    <Route path="cart" element={<Cart/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App
