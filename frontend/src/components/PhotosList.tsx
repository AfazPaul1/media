import Skeleton1 from "./Skeleton1";
import { useFetchPhotosQuery, useAddPhotosMutation } from "../store"
import Button1 from "./Button1";
import AddIcon from '@mui/icons-material/Add';
import PhotosListItem from './PhotosListItem'
function PhotosList({album}) {
    const {isFetching, error, data} = useFetchPhotosQuery(album)
    const [addPhotos, {isLoading: isAddingPhotos}] = useAddPhotosMutation()

    const handleAddPhotos = () => addPhotos(album)
    
    let content;
    if (isFetching) {
        content = <Skeleton1 times={3} height={42} width={298}></Skeleton1>
    } else if (error) {
        content = 'error'
    } else {
        content = data.map((photo) => <PhotosListItem key={photo.id} photo={photo} />)
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