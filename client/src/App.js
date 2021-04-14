import React from 'react';
import ProductList from './ProductList';
import ProductCreate from './ProductCreate';
import ProductEdit from './ProductEdit';

export default ()=>{
    return <div className="container">
        <h1>Product List</h1>
        <ProductList/>
    </div>;

}