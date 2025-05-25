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
                    invalidatesTags:( results, error, user) => {
                        //forgot to wrap the object in an array and that caused the bug where it wouldnt invalidate those tags
                        return [{type: 'UserAlbums', id:user.id}]
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
                    providesTags:( results,error, user) => {
                        const tags = results.map((album) => ({type: 'Album', id: album.id}))
                        tags.push({type:'UserAlbums', id: user.id})
                        return tags
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
                }),
                deleteAlbums: builder.mutation({
                    invalidatesTags:( results, error, album) => {
                        return [{type: 'Album', id:album.id}]
                    },
                    query: (album) => {
                        return {
                            url: `/albums/${album.id}`,
                            method: 'DELETE',
                        }
                    }
                })
            }
        }
    }
)

export const {useFetchAlbumsQuery, useAddAlbumsMutation, useDeleteAlbumsMutation} = albumsApi;
export {albumsApi}