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
                }),
                deleteAlbums: builder.mutation({
                    invalidatesTags:(error, results, album) => {
                        //before our arg was user now its album. how do we get userId? iserid is in album
                        return [{type: 'Album', id:album.userId}]
                    },
                    query: (album) => {
                        return {
                            //we do :albumId to tell that here a variable comes
                            //when passing in a variable we do no do that /:${album.id} its just /:${album.id}
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