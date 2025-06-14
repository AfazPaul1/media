import Skeleton1 from "./Skeleton1";
import { useFetchPhotosQuery, useAddPhotosMutation } from "../store"
import PhotosListItem from './PhotosListItem'
import ImageList from '@mui/material/ImageList';
import type { Album } from "../types/types";
import { Typography } from "@mui/material";
import { Header } from "./Header";
import type { operationType } from "./AlbumsListItem";
function PhotosList({album, increaseAlbumPhotoCount}: {
        album: Album,
        increaseAlbumPhotoCount: (toDo: operationType) => void
    }) {
        console.log("photolist")
    const {isFetching, error, data} = useFetchPhotosQuery(album)
    const [addPhotos, {isLoading: isAddingPhotos}] = useAddPhotosMutation()

    const handleAddPhotos = () => {
        addPhotos(album)
        increaseAlbumPhotoCount("increment")
    }
    
    let content;
    if (isFetching) {
        console.log("photolist skeleton")
        content = <Skeleton1 times={3} height={42} width={470}></Skeleton1>
    } else if (error) {
        content = 'error'
    } else if (data && data.length ){ //data.length cause empty array is truthy
        const photoItem = data.map((photo) => <PhotosListItem key={photo.id} photo={photo} increaseAlbumPhotoCount = {increaseAlbumPhotoCount}/>)
        content = <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {photoItem}
        </ImageList>
    } else {
        content = <Typography>no photos</Typography>
        
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <Header loading={isAddingPhotos} typeOfItem="Photos for" name={album.title} onClick={handleAddPhotos}></Header>
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}

export default PhotosList