import {createSlice} from '@reduxjs/toolkit'
import { fetchUsers } from '../thunks/fetchUsers'
import { addUsers } from '../thunks/addUsers'
import { deleteUser } from '../thunks/deleteUser'
import type {UserState} from '../../types/types'


const initialState: UserState = {
     data: [],
     isLoading: false,
     error:null
}

const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers:{},
    //payloadAction<type>
    //when using TypeScript, you should use the builder style notation for extraReducers and all your Types will be automatically inferred for you.
    //You should not need to type anything down in extraReducers by hand - ever.
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state) => {
             state.isLoading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
             state.isLoading = false;
             state.data = action.payload;  
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
             state.isLoading = false
             state.error = action.error
        })
        builder.addCase(addUsers.pending, (state) => {
             state.isLoading = true
        })
        builder.addCase(addUsers.fulfilled, (state, action) => {
             state.isLoading = false;
             state.data.push(action.payload)
        })
        builder.addCase(addUsers.rejected, (state, action) => {
             state.isLoading = false
             state.error = action.error
        })
        builder.addCase(deleteUser.pending, (state) => {
               state.isLoading = true
          })
          builder.addCase(deleteUser.fulfilled, (state, action) => {
               state.isLoading = false
               const {deletedId} = action.payload
               state.data = state.data.filter((user) => user.id !== deletedId )
          })
          builder.addCase(deleteUser.rejected, (state, action) => {
               state.isLoading = false
               state.error = action.error
          })
    }
})

export const usersReducer = usersSlice.reducer
