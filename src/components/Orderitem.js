import React from 'react'

const Orderitem = (props) => {
    return (
        <div className="cart-items-container order">
            <h3>you order {props.totalItem} item on {props.date}</h3>
        {props.items.map((item)=>{
            return <div className='items-info' key={props.id + item.id}>
            <div className='product-img'>
                {item.product_images && <img src = {item.product_images} alt='p1' />}
                {/* <img src = {product_images[0].url} alt='p1' /> */}
                </div>
                <div className='title'>
                    {/* <h2>{product_name.length>15?product_name.slice(0 , 15)+"...":product_name} </h2> */}
                    <h1>{item.product_name}</h1>
                    {/* <p>{product_desc.slice(1 , 30)} </p> */}
                </div>
                <div className='price'>
                    <h3> {item.product_price} x {item.quantity}</h3>
                </div>
                </div>
        })}
                </div>
    )
}

export default Orderitem
