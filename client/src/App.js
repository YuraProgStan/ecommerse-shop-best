import React from 'react';
import Home from "./pages/home/Home";
import ProductList from "./pages/productlist/ProductList";
import Product from "./pages/product/Product";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import {Navigate, Route, Routes} from "react-router-dom";
import Products from "./components/products/Products";
import Success from "./pages/success/Success";
import {useSelector} from "react-redux";

const App = () => {
    const user = useSelector(state => state.user.currentUser);
    return (
        <Routes>
            <Route path={'/'} element={<Home/>} />
            <Route path={'/products/:category'} element={<ProductList/>} />
            <Route path={'/product/:id'} element={<Product/>} />
            <Route path={'/cart'} element={<Cart/>} />
            <Route path={'/success'} element={<Success/>} />
            <Route path={'/login'} element={user?<Navigate to={'/'}/>:<Login/>}/>
            <Route path={'/register'} element={user?<Navigate to={'/'}/>:<Register/>} />
        </Routes>

    );
};

export default App;