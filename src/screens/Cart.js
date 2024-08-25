import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import trash from '../trash.png'

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='mt-5 w-100 text-center fs-3 text-white'>This Cart is Empty!</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch('http://localhost:8000/api/orderData', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log("Order Response : ", response)
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0);
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-black fs-4'>
                        <tr>
                            <th scope='col' className='text-white'>#</th>
                            <th scope='col' className='text-white'>Name</th>
                            <th scope='col' className='text-white'>Quantity</th>
                            <th scope='col' className='text-white'>Option</th>
                            <th scope='col' className='text-white'>Amount</th>
                            <th scope='col' className='text-white'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th className='text-white' scope='row' >{index + 1}</th>
                                <td className='text-white'>{food.name}</td>
                                <td className='text-white'>{food.quantity}</td>
                                <td className='text-white'>{food.size}</td>
                                <td className='text-white'>{food.price}</td>
                                <td ><button type="button" className="btn p-0 text-white"><img src={trash} alt="delete" style={{ filter: 'invert(100%)', height: '20px', width: '20px' }} onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 text-white' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>
        </div>
    )
}
