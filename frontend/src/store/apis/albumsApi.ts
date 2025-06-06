import {createApi, fetchBaseQuery} from  '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'
import {pause} from '../../hooks/useDelay'
import type {User, Album} from '../../types/types'

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
        tagTypes: ["Album", "UserAlbums"],
        endpoints(builder){
            return {
                addAlbums: builder.mutation({
                    invalidatesTags:( _results, _error, user) =>  [{type: 'UserAlbums', id:user.id}],
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
                fetchAlbums: builder.query<Album[], User>({
                    
                    providesTags:( results,_error, user) => 
                        
                        
                        results
                        ? [
                            ...results.map((album: Album) => ({type: 'Album' as const, id: album.id})),
                            {type:'UserAlbums' as const, id: user.id},
                        ]
                        : [{type:'UserAlbums' as const, id: user.id}]
                    ,
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
                    invalidatesTags:( _results, _error, album) => [{type: 'Album' as const, id:album.id}],
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