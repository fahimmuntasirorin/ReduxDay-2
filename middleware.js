// state 
// action 
// reducers
// store
// api - https://jsonplaceholder.typicode.com/todos

const { default: axios } = require("axios");
const { createStore , applyMiddleware } = require("redux");
const thunk = require('redux-thunk').default;
const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
const GET_TODOS_FAILD = "GET_TODOS_FAILD";
const API = "https://jsonplaceholder.typicode.com/todos";
// state 
const initialTodosState = {
    todos:[],
    isLoading:false,
    error:null
}

// action 
const todosRequest = () =>{
    return{
        type:GET_TODOS_REQUEST
    }
}
const todosSuccess = (todos) =>{
    return{
        type:GET_TODOS_SUCCESS,
        payload:todos
    }
}
const todosFailed = (err) =>{
    return{
        type:GET_TODOS_FAILD,
        payload:err
    }
}
// reducers
const todosReducer = (state = initialTodosState,action) =>{
    switch (action.type) {
        case GET_TODOS_REQUEST:
            
           return{
            ...state,
            isLoading:true

           }
    
        case GET_TODOS_SUCCESS:
           return{
            ...state,
            isLoading:false,
            todos:action.payload
        }
        case GET_TODOS_FAILD:
           return{
            ...state,
            isLoading:false,
            error:action.payload
        }
        default:
           return state
    }
}

const fetchData = () =>{
    return (dispatch) =>{
        dispatch(todosRequest())
        axios
        .get(API)
        .then(res=>{
            const todos = res.data;
            const todosTitle = todos.map(todo=>todo.title);
            dispatch(todosSuccess(todosTitle))
        })
        .catch(err=>{
            const error = err.message;
            dispatch(todosFailed(error))
        })
    }
}
const store = createStore(todosReducer ,  applyMiddleware(thunk))
store.subscribe(()=>{
    console.log(store.getState())
})

// action dispatch
store.dispatch(fetchData())
