import React, { useContext } from 'react'
import { cartContax } from '../context/Cart';

const Items = ({product_name,product_desc,product_price, product_images , id ,index, quantity})=>{
    const {removeItem ,increment  , decrement} = useContext(cartContax)

return (
    <>
     <div className='items-info'>
       <div className='product-img'>
           <img src = {product_images[0].url} alt='p1' />
           </div>
           <div className='title'>
               <h2>{product_name.length>15?product_name.slice(0 , 15)+"...":product_name} </h2>
               {/* <p>{product_desc.slice(1 , 30)} </p> */}
           </div>
           <div className='add-minus-quantity'>
               <div className="decrease" onClick={()=>decrement(id)}>
           <i className="fa fa-minus minus" aria-hidden="true"></i>
               </div>
                <input type='text' placeholder= {quantity}/>
                <div className="increase" onClick={()=>increment(id)}>
                <i className="fa fa-plus" aria-hidden="true" ></i>
                </div>
           </div>
           <div className='price'>
               <h3>{product_price} </h3>
           </div>
           <div className='remove-item' onClick={()=>removeItem(id)}>
           <i className="fa fa-trash-alt remove" aria-hidden="true" ></i>
           </div>
       </div>
    </>
)
}

export default Items
