import Skeleton1 from "./Skeleton1";
import { useFetchPhotosQuery, useAddPhotosMutation } from "../store"
import Button1 from "./Button1";
import AddIcon from '@mui/icons-material/Add';
import PhotosListItem from './PhotosListItem'
import ImageList from '@mui/material/ImageList';
function PhotosList({album}) {
    const {isFetching, error, data} = useFetchPhotosQuery(album)
    const [addPhotos, {isLoading: isAddingPhotos}] = useAddPhotosMutation()

    const handleAddPhotos = () => addPhotos(album)
    
    let content;
    if (isFetching) {
        content = <Skeleton1 times={3} height={42} width={470}></Skeleton1>
    } else if (error) {
        content = 'error'
    } else {
        const photoItem = data.map((photo) => <PhotosListItem key={photo.id} photo={photo} />)
        content = <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {photoItem}
        </ImageList>
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Photos for {album.title}</h3>
                <Button1 loading={isAddingPhotos} onClick={() => handleAddPhotos(album)}>
                    <AddIcon></AddIcon>
                </Button1>
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}

export default PhotosList