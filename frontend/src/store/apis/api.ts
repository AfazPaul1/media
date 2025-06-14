import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {pause} from '../../hooks/useDelay'
import type {User, Album, Photo} from '../../types/types'
import { faker } from '@faker-js/faker'
const api = createApi(
    {
        reducerPath: "api",
        baseQuery: fetchBaseQuery({
            baseUrl: 'http://localhost:3000',
            fetchFn: async (...args) => {
                    await pause(1000)
                    return fetch(...args)
                }
        }),
        tagTypes: ["Album", "UserAlbums", "photo", "albumPhotos"],
        endpoints: (builder) => {
            return {
            fetchPhotos: builder.query<Photo[], Album>({
                providesTags: (result, _error, album) => 
                    result
                    ? [ ...result.map((photo: Photo) => ({type:'photo' as const, id:photo.id})), {type:'albumPhotos' as const, id: album.id}]
                    : [{type:'albumPhotos' as const, id: album.id}],
                
                query: (album) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id
                        },
                        method:'GET'
                    }
                 },
            }),
            addPhotos: builder.mutation({
                invalidatesTags: (_result, _error, album) => ([{type: 'albumPhotos', id: album.id}, {type: 'Album' as const, id: album.id}]),
                query: (album) => {
                    return {
                        url: `/photos`,
                        method: 'POST',
                        body: {
                            url: faker.image.url({width: 164, height:164}),
                            albumId: album.id
                        }
                    }
                }
            }),
            deletePhotos: builder.mutation({
                invalidatesTags(_result, _error, arg) {
                    return [{type:'photo', id:arg.id}]
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE'
                    }
                }
            }),
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
export const {useFetchAlbumsQuery, useAddAlbumsMutation, useDeleteAlbumsMutation, useFetchPhotosQuery, useAddPhotosMutation, useDeletePhotosMutation} = api;
export {api}