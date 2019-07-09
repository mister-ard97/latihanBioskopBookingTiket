const INITIAL_STATE = {
    cart: []
}

export default (state = INITIAL_STATE, action) => {
    if (action.type === 'ADD_TO_CART') {
        return action.payload
    } else if (action.type === 'DELETE_CART') {
        return INITIAL_STATE
    } else {
        return state
    }
}