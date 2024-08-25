import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

const Card = (props) => {
    let dispatch = useDispatchCart()
    let data = useCart()
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options)
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState("")
    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }
        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, quantity: quantity })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, quantity: quantity, size: size })
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, quantity: quantity, size: size })
    }
    // console.log(data)
    let finalPrice = quantity * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value);
    })
    return (
        <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "500px" }}>
            <img src={props.foodItem.img} className="card-img-top" style={{ "width": "18rem", "height": "180px", 'border': '1px solid grey', objectFit: "fill" }} alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                {/* <p className="card-text">{props.foodItem.description}</p> */}
                <div className='container w-100 ps-0'>
                    <select className='m-2 ms-0 h-100 bg-success rounded text-white' onChange={(e) => setQuantity(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {  // e = elememt, i=index
                            return (
                                <option className='text-white' key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className='m-2 h-100 bg-success rounded ms-0 ps-0 text-white' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {priceOptions.map((data) => {
                            return <option className='text-white' key={data} value={data}>{data}</option>
                        })}
                    </select>
                    <div className=' h-100 fs-5'>
                        Total Price : ₹{finalPrice}/-
                    </div>
                    <hr />
                    <button className='btn btn-success justify-content-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card
