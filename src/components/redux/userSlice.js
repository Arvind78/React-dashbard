import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isFetching: false,
    error: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.user = action.payload
        },
        loginFailure: (state) => {
           state.error = true
           state.isFetching = false
        },
        logout: (state) => {
           localStorage.removeItem('token')
            state.user = null
            state.isFetching = false
            state.error = false
        }
        }
})


export const {loginStart, loginSuccess, loginFailure, logout} = userSlice.actions
export default userSlice.reducer