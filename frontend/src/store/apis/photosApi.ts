import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Album, Photo } from "../../types/types"
import { faker } from '@faker-js/faker'
import {pause} from '../../hooks/useDelay'
const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        fetchFn: async (...args) => {
                await pause(1000)
                return fetch(...args)
            }
    }),
    tagTypes: ["photo", "albumPhotos"],
    endpoints(builder){
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
                invalidatesTags: (_result, _error, album) => ([{type: 'albumPhotos', id: album.id}]),
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
            })
        }
    }
})

export const {useFetchPhotosQuery, useAddPhotosMutation, useDeletePhotosMutation} = photosApi;
export {photosApi}