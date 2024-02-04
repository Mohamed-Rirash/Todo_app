import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from './authService'


const token = sessionStorage.getItem("token")

const initialState = {
    token:token ? token : null,
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:''
}

//login

export const login = createAsyncThunk("/auth/token" , async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

//logout

export const logout = createAsyncThunk('/logout', async() => {
    await authService.logout()
})

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:(state) => {
            state.isLoading = false
            state.isError = false
            state.token = null
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        }).addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.token = action.payload

        }).addCase(login.rejected, (state ,action) => {
            state.isError = true
            state.message = action.payload
            state.isLoading = false
            state.isSuccess = false
            state.token = null
        }).addCase(logout.fulfilled , (state) => {
            state.token = null
            state.isSuccess = false
            state.isError = false
            state.isLoading = false
            state.message = ''
        })
        
      
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer