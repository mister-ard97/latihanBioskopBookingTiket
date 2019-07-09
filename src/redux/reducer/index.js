import { combineReducers } from 'redux';
import UserReducer from './user';
import CartReducer from './cart_user'

export default combineReducers({
    user: UserReducer,
    cart: CartReducer
})