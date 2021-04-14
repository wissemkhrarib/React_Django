import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ProductCreate from './ProductCreate';
import ProductEdit from './ProductEdit';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  

export default()=>{

    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    const fetchProducts= async() => {
        const res = await axios.get('http://127.0.0.1:8000/api/products/');
        setProducts(res.data);
        setSearchResults(res.data);
    };

    const handleChange = event => {
        setSearchTerm(event.target.value);
       };

    useEffect(()=>{fetchProducts();}, []);

    useEffect(() => {
        const results = products.filter(product =>
          product.name.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
      }, [searchTerm]);

    const deleteProduct = async (productId) => {
        await axios.delete(`http://127.0.0.1:8000/api/products/${productId}`);
        document.getElementById(`${productId}`).remove();
    }
    
    const renderedProducts = searchResults.map(product =>{
        return <tr id={product.id} key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td><a href={"/edit/"+product.id}>edit</a></td>
            <td><button className="btn btn-outline-danger" onClick={()=>deleteProduct(product.id)}>delete</button></td>
        </tr>
    });

    return <div>
                    <input
                            className="form-control"
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                    <table className="table">
                    <thead>
                    <tr><th>name</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>edit</th>
                    <th>delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {renderedProducts}
                    </tbody>
                </table>
                <hr/>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Create</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/edit/:id">
            <ProductEdit />
          </Route>
          <Route path="/">
            <ProductCreate />
          </Route>
        </Switch>
      </div>
    </Router>

    </div>;
}