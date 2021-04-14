import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
    useParams
  } from "react-router-dom";

export default ()=>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQantity] = useState('');
    const { id } = useParams();
    const getPorduct = async()=>{

        const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
        setName(res.data.name);
        setPrice(res.data.price);
        setQantity(res.data.quantity);

    }

    useEffect(()=>{getPorduct()}, []);

    const onSubmit = async()=>{

        await axios.put(`http://127.0.0.1:8000/api/products/${id}/`,{name, price, quantity});
        console.log({name, price, quantity});

    }
    return <div>
                <h1>Edit a product</h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>name</label>
                <input value={name} onChange={e=>setName(e.target.value)} className="form-control"/>
            </div>
            <div className="form-group">
                <label>price</label>
                <input value={price} onChange={e=>setPrice(e.target.value)}  className="form-control"/>
            </div>
            <div className="form-group">
                <label>quantity</label>
                <input value={quantity} onChange={e=>setQantity(e.target.value)}  className="form-control"/>
            </div>
            <button className="btn btn-primary">Save</button>
        </form>
    </div>;
}
