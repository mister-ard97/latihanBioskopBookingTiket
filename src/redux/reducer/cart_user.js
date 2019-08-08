const INITIAL_STATE = {
    cart: [],
    count: 0
}

export default (state = INITIAL_STATE, action) => {
    if (action.type === 'ADD_TO_CART') {
        state = {...state}
        if(state.cart.length === 0) {
            state.cart.push({...action.payload})
            state.count = state.count + 1
            return state;
        } else {
            let data = action.payload
            let title = data.titleMovie;
            let bookedSeat = data.bookedSeat;
            let bookedPosition = data.bookedPosition
            let price = data.price;
            let user = state.cart.find((val) => val.titleMovie === title)
            if(user === undefined) {
                state.cart.push(data)
                state.count = state.count + 1
            } else {
                state.cart.forEach((val) =>
                {
                    if(val.titleMovie === title) {
                        val.bookedSeat += ', ' + bookedSeat;
                        val.bookedPosition = [...val.bookedPosition, ...bookedPosition]
                        val.price += price;
                    }
                })
            }
            return state
        }
        
    } else if (action.type === 'DELETE_CART') {
        state = {...state}
        state.cart = action.payload
        state.count = state.count - 1
        return state;
    } else if(action.type === 'DELETE_CART_ALL'){
        return state = {
            cart: [],
            count: 0
        }
    } else {
        return state;
    }
}