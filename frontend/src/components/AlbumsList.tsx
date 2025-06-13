import AddIcon from '@mui/icons-material/Add';
import { useFetchAlbumsQuery, useAddAlbumsMutation} from "../store";
import Button1 from './Button1'
import AlbumsListItem from "./AlbumsListItem";
import type { User } from '../types/types';
import Skeleton1 from "./Skeleton1";
import { Typography } from '@mui/material';
function AlbumsList({user}: {
    user: User
}) {

    const {data, isFetching, error} = useFetchAlbumsQuery(user)
    const [addAlbums, {isLoading: isAddingAlbums, }] = useAddAlbumsMutation()
    
    
    const handleAddAlbums = () => {
        addAlbums(user)
    }
    
    
    let content;
    if (isFetching) {
        content = <Skeleton1 height={42} width={298} times={2}></Skeleton1>
    } else if (error) {
        content = error.error
    } else {
        content = data.map(album =>  <AlbumsListItem key={album.id} album={album} />)
    }
    
    
    return (
            <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums for {user.name}</h3>
                <Button1 loading={isAddingAlbums}  onClick={handleAddAlbums}>
                    <AddIcon></AddIcon>
                </Button1>
            </div>
            <div>
                {content}
            </div>
        </div>
      
    )
}

export default AlbumsList