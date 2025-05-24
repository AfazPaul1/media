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
                        //made a mistake here where i was still invalidtaing user and not useralbum when i had changed the tag provided to useralbum
                        //this caused the refetch to not happen cause it wasnt invalidated
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
                        //positional arguments rtkq calls it with args passed in a particular order
                        //Wrap the object in parentheses to tell JavaScript you’re returning an object
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
                        //before our arg was user now its album. how do we get userId? iserid is in album
                        return [{type: 'Album', id:album.id}]
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