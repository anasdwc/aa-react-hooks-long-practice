import React, { useEffect, useState } from 'react';
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'

function ProductView({ products }) {

  // TODO: Replace with state variable
  // DONE
  const [sideOpen, setSideOpen] = useState(
    (localStorage.getItem('sideOpen') === 'true' ? true : false) || true
  );
  const [selectProduct, setSelectProduct] = useState(
    JSON.parse(localStorage.getItem('selectProduct')) || ''
  )

  useEffect(() => {
    // console.log(`selectedProduct CHANGED TO`, selectProduct);
    if (selectProduct)
      setSideOpen(true)

    localStorage.setItem('selectProduct', JSON.stringify(selectProduct))
  }, [selectProduct])

  useEffect(() => {
    // console.log(`sideOpen CHANGED TO`, sideOpen);
    if(!sideOpen) 
      setSelectProduct('')

    localStorage.setItem('sideOpen', sideOpen)
  }, [sideOpen])

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(item =>
            <ProductListItem
              key={item.id}
              product={item}
              onClick={() => setSelectProduct(item)}
              isSelected={selectProduct.id === item.id}
            />
          )}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div className="product-side-panel-toggle"
               onClick={() => setSideOpen(!sideOpen)}>
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        <ProductDetails visible={sideOpen} product={selectProduct}/>
      </div>
    </div>
  );
}

export default ProductView;
