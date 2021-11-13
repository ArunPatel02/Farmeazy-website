// import { products } from "./Products"

let productdata = []

fetch("https://farmeazy-api.herokuapp.com/getproducts" , {
    method : "GET"
}).then((res)=>res.json()).then((data)=>productdata = data).catch((error)=>console.log(error))

const reducer=(state,action)=>{
if(action.type === 'REMOVE_ITEM' ){
    return {
        ...state,
        item: state.item.filter((curr)=>{
            return curr.id !== action.payload
        })
    }
}

if(action.type === 'ADD_ITEM' ){
    // console.log(action.payload)
    const flag = state.item.find((curr)=>curr.id=== action.payload)
    // console.log(flag);
    if (flag) {
        let updatedcart = state.item.map((curr)=>{
            if(curr.id=== action.payload){
                return{
                    ...curr,
                    quantity : curr.quantity+1
                }
            }
            return curr;
        })
      return {...state , item: updatedcart}
    }else{
    const ele = productdata.find((pre)=>pre.id===action.payload);
    console.log(ele)
    return {
        item : [...state.item , {...ele , quantity: 1,}],
            totalAmount : state.totalAmount,
            totalItem : state.totalItem++ 
    }
}
}

if(action.type==='CLEAR_CART'){
    return{
        ...state,
        item : []
    }
}

if(action.type==='INCREMENT'){
        let updatedcart = state.item.map((curr)=>{
            if(curr.id=== action.payload){
                return{
                    ...curr,
                    quantity : curr.quantity+1
                }
            }
            return curr;
        })
      return {...state , item: updatedcart}
}

 if(action.type==='DECREMENT'){
    
        let updatedcart = state.item.map((curr)=>{
            if(curr.id=== action.payload){
                return{
                    ...curr,
                    quantity : curr.quantity-1
                }
              
            }
            return curr;
            
        }).filter((curr)=>{
            return curr.quantity !== 0;
            
        })
      return {...state , item: updatedcart}
       
   
}
if(action.type==='GET_TOTAL'){
    let {totalItem ,totalAmount } = state.item.reduce(
        (accum,curval)=>{
            let {quantity,product_price} = curval;
            let updatedtotalamount = product_price * quantity;
            accum.totalAmount += updatedtotalamount;
            accum.totalItem += quantity;
            return accum;
        },
        {
            totalItem:0,
            totalAmount:0
        }
    )
    return {...state,totalItem ,totalAmount}
}

return state
}
export default reducer;