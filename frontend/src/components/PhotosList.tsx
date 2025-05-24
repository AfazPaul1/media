import Skeleton1 from "./Skeleton1";
import { useFetchPhotosQuery } from "../store"
import Button1 from "./Button1";
import AddIcon from '@mui/icons-material/Add';
function PhotosList({album}) {
    const {isFetching, error, data} = useFetchPhotosQuery(album)
    
    let content;
    if (isFetching) {
        content = <Skeleton1 times={3} height={42} width={298}></Skeleton1>
    } else if (error) {
        content = 'error'
    } else {
        content = data.map((photo) => photo.url)
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Photos for {album.title}</h3>
                <Button1>
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