const INITIAL_STATE = {
    cart: []
}

export default (state = INITIAL_STATE, action) => {
    if (action.type === 'ADD_TO_CART') {
        state = {...state}
        if(state.cart.length === 0) {
            state.cart.push({...action.payload})
        } else {
            state.cart.push({ ...action.payload })
        }
        return state;
    } else if (action.type === 'DELETE_CART') {
        return INITIAL_STATE
    } else {
        return state
    }
}