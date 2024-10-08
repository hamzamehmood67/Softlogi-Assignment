import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./components/Root"
import AddProduct from "./pages/AddProduct"
import ProductDetail, { loader as productLoader } from "./components/ProductDetail";
import EditProduct from "./pages/EditProduct";
import { action as manipulateProduct } from "./components/ProductForm";
import CategoryPage from "./pages/CategoryPage";
import AddCategory from "./pages/AddCategory"
const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/product/:id',
                id: 'product-detail',
                loader: productLoader,
                children: [
                    {
                        index: true, // Directly define the product detail route
                        element: <ProductDetail />,

                    },
                    {
                        path: 'edit',
                        element: <EditProduct />,
                        action: manipulateProduct
                    }
                ]
            },
            {
                path: '/addproduct',
                element: <AddProduct />,
                action: manipulateProduct
            },
            {
                path: '/categories',
                element: <CategoryPage />,
               
            },
            {
                path: '/categories/new',  // This will display the AddCategory component
                element: <AddCategory />
            }
        ]
    }
]);

function App() {
    return <div><RouterProvider router={routes}></RouterProvider></div>
}

export default App

