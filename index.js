// state 
// action 
// reducer
// store 
// store subscribe
// action dispatch

const { createStore, combineReducers , applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");

// product 

const GET_PRODUCT = "GET_PRODUCT";
const ADD_PRODUCT = "ADD_PRODUCT";

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

// combine reducers 




const store = createStore(handleReducerLogic,applyMiddleware(logger))
store.subscribe(()=>{
    console.log(store.getState());
})


store.dispatch(handleAddProduct("sugarMoult"))
store.dispatch(handleAddProduct("sugarMoultX"))
