const INITIAL_STATE = {
    id: 0,
    username: '',
    password: '',
}
//Password harus di hashing terlebih dahulu

export default (state = INITIAL_STATE, action) => {
    if(action.type === 'LOGIN_BERHASIL') {
        return action.payload
    } else {
        return state
    }
}