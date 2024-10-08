

function ProductItem({ key, product }) {
    return (
        <li  className='product-card'>
            <p className='productName'>Name: {product.productName}</p>
            <p>Tags: {product.tags}</p>
            {product.categories.length > 0 && <div>Categories: {product.categories.map(c => c)}</div>}
        </li>
  );
}

export default ProductItem;