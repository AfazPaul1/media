import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import {setupListeners} from '@reduxjs/toolkit/query'
import {albumsApi} from './apis/albumsApi'

const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
    }
})

setupListeners(store.dispatch)

export {store}
export * from './thunks/fetchUsers'
export * from './thunks/addUsers'
export * from './thunks/deleteUser'

export {useFetchAlbumsQuery, useAddAlbumsMutation} from './apis/albumsApi'