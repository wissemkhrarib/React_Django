import axios from 'axios';
import React, {useState} from 'react';

export default ()=>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQantity] = useState('');
    const onSubmit = async()=>{

        await axios.post('http://127.0.0.1:8000/api/products/',{name, price, quantity});

    }
    return <div>
        <h1>Create a product</h1>
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
            <button className="btn btn-primary">Create</button>
        </form>
    </div>;
}
