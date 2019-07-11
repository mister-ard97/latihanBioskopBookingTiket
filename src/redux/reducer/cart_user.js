const INITIAL_STATE = {
    cart: []
}

export default (state = INITIAL_STATE, action) => {
    if (action.type === 'ADD_TO_CART') {
        state = {...state}
        if(state.cart.length === 0) {
            state.cart.push({...action.payload})
            return state;
        } else {
            let data = { ...action.payload }
            let title = data.titleMovie;
            let bookedSeat = data.bookedSeat;
            let price = data.price;
            let user = state.cart.find((val) => val.titleMovie === title)
            if(user === undefined) {
                state.cart.push(data)
            } else {
                state.cart.findIndex((val) =>
                {
                    if(val.titleMovie === title) {
                        val.bookedSeat += bookedSeat;
                        val.price += price;
                    }
                })
            }
            return state
        }
        
    } else if (action.type === 'DELETE_CART') {
        return INITIAL_STATE
    } else {
        return state
    }
}