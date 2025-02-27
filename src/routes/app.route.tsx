import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home.page";
import BrowseProductsPage from "../pages/products.page";

const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" index element={<HomePage/>}/>
                    <Route path="/products" element={<BrowseProductsPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoutes