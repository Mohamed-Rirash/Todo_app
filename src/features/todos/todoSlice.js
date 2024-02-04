import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import todoService from './todoService'

const initialState = {
  todos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// Get user goals
export const getTodos = createAsyncThunk(
    'todos/getTodos',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.token.token
        return await todoService.getTodos(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )


  export const todoSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
     
        .addCase(getTodos.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getTodos.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.todos = action.payload
        })
        .addCase(getTodos.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        
    },
  })
  
//   export const { reset } = goalSlice.actions
//   export default todoSl.reducer
export const {reset} = todoSlice.actions
export default todoSlice.reducer