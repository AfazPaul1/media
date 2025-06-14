export interface User {
     id: number,
     name: string
}
export interface UserState {
     data: User[],
     isLoading: boolean,
     error: unknown
}

export interface Album {
    id: number,
    title: string,
    userId: number,
    _count: {
        photos:number
    }
}

export interface Photo {
    id: number,
    url: string, 
    albumId: number
}

