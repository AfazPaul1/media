import {createApi, fetchBaseQuery} from  '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'
const albumsApi = createApi(
    {
        reducerPath: 'albums',
        baseQuery: fetchBaseQuery({
            baseUrl: 'http://localhost:3000'
        }),
        endpoints(builder){
            return {
                addAlbums: builder.mutation({
                    query: (user) => {
                        return {
                            url: '/albums',
                            method: 'POST',
                            body: {
                                userId: user.id,
                                title:faker.music.album()
                            }
                        }
                    }
                }),
                fetchAlbums: builder.query({
                    query: (user) => {
                        return {
                            url: '/albums',
                            params: {
                                userId: user.id
                            },
                            method: 'GET'
                        }
                    }
                })
            }
        }
    }
)

export const {useFetchAlbumsQuery, useAddAlbumsMutation} = albumsApi;
export {albumsApi}