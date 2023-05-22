// state 
// action 
// reducer
// store 
// store subscribe
// action dispatch

const { createStore, combineReducers } = require("redux");

// product 

const GET_PRODUCT = "GET_PRODUCT";
const ADD_PRODUCT = "ADD_PRODUCT";
const GET_CART = "GET_CART";
const ADD_CART = "ADD_CART";

const initialProductState = {
    products:["salt","sugar"],
    count : 2
};

const handleGetProduct = () =>{
    return {
        type:GET_PRODUCT
    }
}
const handleAddProduct = (product) =>{
    return {
        type:ADD_PRODUCT,
        payload:product
    }
};
const handleReducerLogic = (state = initialProductState , action)=>{
    switch (action.type) {
        case ADD_PRODUCT:
            return{
                products:[...state.products , action.payload],
                count: state.count + 1
            }
        case GET_PRODUCT:
            return{
                ...state
            }
        
        default:
            return state;
    }
}

const initialCartState = {
    cart:["salt","sugar"],
    cartCount : 2
}
const handleGetCart = () =>{
    return{
        type:GET_CART
    }
}

const handleAddCart = (cart) =>{
    return{
        type:ADD_CART,
        payload:cart
    }
}

const handleCartReducerLogic = (state=initialCartState , action) =>{
    switch (action.type) {
        
        case ADD_CART :
            return{
                cartProduct:[...state.cart , action.payload],
                cartCount:state.cartCount + 1 
            }
        case GET_CART:
            return {
                ...state
            }
        default:
            return state;
    }
}

// combine reducers 


const rootReducer = combineReducers(
    {
        productR : handleReducerLogic,
        cartR: handleCartReducerLogic
    }
)

const store = createStore(rootReducer)
store.subscribe(()=>{
    console.log(store.getState());
})

store.dispatch(handleGetCart())
store.dispatch(handleAddCart("mouse"))
store.dispatch(handleGetProduct())
store.dispatch(handleAddProduct("sugarMoult"))
