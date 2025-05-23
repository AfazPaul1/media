import {createApi, fetchBaseQuery} from  '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
  }
const albumsApi = createApi(
    {
        reducerPath: 'albums',
        baseQuery: fetchBaseQuery({
            baseUrl: 'http://localhost:3000',
            fetchFn: async (...args) => {
                await pause(1000)
                return fetch(...args)
            }
        }),
        endpoints(builder){
            return {
                addAlbums: builder.mutation({
                    invalidatesTags:(error, results, user) => {
                        return [{type: 'Album', id:user.id}]
                    },
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
                    providesTags:(error, results, user) => {
                        return [{type: 'Album', id:user.id}]
                    },
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