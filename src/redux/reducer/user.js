const INITIAL_STATE = {
    id: 0,
    username: '',
    status: ''
}
//Password harus di hashing terlebih dahulu

export default (state = INITIAL_STATE, action) => {
    if(action.type === 'LOGIN_BERHASIL') {
        return action.payload
    } else if(action.type === 'LOG_OUT') {
        return INITIAL_STATE
    } else {
        return state
    }
}