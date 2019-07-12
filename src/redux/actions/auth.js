export const onRegisterSuccess = (data) => {
    return {
        type: 'LOGIN_BERHASIL',
        payload: data
    }
}

export const onLogout = () => {
    return {
        type: 'LOG_OUT'
    }
}

export const AddToCart = (data) => {
    return {
        type: 'ADD_TO_CART',
        payload: data
    }
}

export const DeleteCart = (data) => {
    return {
        type: 'DELETE_CART',
        payload: data
    }
}

export const DeleteCartAll = () => {
    return {
        type: 'DELETE_CART_ALL'
    }
}