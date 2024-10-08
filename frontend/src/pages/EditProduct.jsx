
import ProductForm from "../components/ProductForm";
import {
    useRouteLoaderData,
} from 'react-router-dom';
function EditProduct() {
    const { product } = useRouteLoaderData('product-detail');
    return (
        <ProductForm method={'PUT'} product={product} />
  );
}

export default EditProduct;