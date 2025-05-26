import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
//wrong import didnt import specifically for react which gives us the hooks
import { faker } from '@faker-js/faker'
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
  }
const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        fetchFn: async (...args) => {
                await pause(1000)
                return fetch(...args)
            }
    }),
    endpoints(builder){
        return {
            fetchPhotos: builder.query({
                providesTags: (result, error, album) => 
                    result
                    ? [ ...result.map(photo => ({type:'photo', id:photo.id})), {type:'albumPhotos', id: album.id}]
                    : [{type:'albumPhotos', id: album.id}],
                
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
                invalidatesTags: (result, error, album) => ([{type: 'albumPhotos', id: album.id}]),
                query: (album) => {
                    return {
                        url: `/photos`,
                        method: 'POST',
                        body: {
                            url: faker.image.url(),
                            albumId: album.id
                        }
                    }
                }
            }),
            deletePhotos: builder.mutation({
                invalidatesTags(result, error, arg, meta) {
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