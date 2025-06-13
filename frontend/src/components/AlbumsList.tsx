import { useFetchAlbumsQuery, useAddAlbumsMutation} from "../store";
import AlbumsListItem from "./AlbumsListItem";
import type { User } from '../types/types';
import Skeleton1 from "./Skeleton1";
import { Typography } from '@mui/material';
import { Header } from "./Header";
let albumListRenderCount = 0
function AlbumsList({user}: {
    
    user: User
}) {
    albumListRenderCount++
    console.log("albumListRenderCount ", albumListRenderCount);
    
    const {data, isFetching, error} = useFetchAlbumsQuery(user)
    const [addAlbums, {isLoading: isAddingAlbums, }] = useAddAlbumsMutation()
    
    
    const handleAddAlbums = () => {
        addAlbums(user)
    }
    
    
    let content;
    if (isFetching) {
        console.log("albumListRenderCount skeleton ", albumListRenderCount);
        content = <Skeleton1 height={42} width={298} times={2}></Skeleton1>
    } else if (error) {
        console.log("albumListRenderCount data ", albumListRenderCount);
        content = <Typography>error</Typography>
    } else if (data && data.length){
        content = data.map(album =>  <AlbumsListItem key={album.id} album={album} />)
    } else {
        content = <Typography>no albums</Typography>
    }
    
    
    return (
            <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <Header loading= {isAddingAlbums} typeOfItem="Albums of" name={user.name} onClick={handleAddAlbums}></Header>
            </div>
            <div>
                {content}
            </div>
        </div>
      
    )
}

export default AlbumsList