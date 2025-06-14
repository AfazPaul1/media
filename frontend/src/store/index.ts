import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import {setupListeners} from '@reduxjs/toolkit/query'
import {api} from "./apis/api"

const store = configureStore({
    reducer: {
        users: usersReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(api.middleware)
    }
})

setupListeners(store.dispatch)

export {store}
export * from './thunks/fetchUsers'
export * from './thunks/addUsers'
export * from './thunks/deleteUser'

export {useFetchAlbumsQuery, useAddAlbumsMutation, useDeleteAlbumsMutation} from './apis/api'
export {useFetchPhotosQuery, useAddPhotosMutation, useDeletePhotosMutation} from './apis/api'
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<AppStore['getState']>
// export RootState type which describes the share of the redux store - global state tree and use it to type useSelector cause ts doesnt know state structure automatically