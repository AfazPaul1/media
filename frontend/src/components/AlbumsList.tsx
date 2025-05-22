import { Grid, Typography, IconButton, Stack } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useFetchAlbumsQuery, useAddAlbumsMutation } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import Button1 from './Button1'

import Skeleton1 from "./Skeleton1";
function AlbumsList({user}) {

    const {data, isLoading, error} = useFetchAlbumsQuery(user)
    //maybe should first destructure the whole thing to find whether array or obj
    const [addAlbums, {isLoading: isAddingAlbums}] = useAddAlbumsMutation()
    const handleAddAlbums = () => {
        addAlbums(user)
    }
    
    let content;
    if (isLoading) {
        content = <Skeleton1 times={2}></Skeleton1>
    } else if (error) {
        content = error.error
    } else {
        content = data.map((album) => {
            const header = <Typography align="center">{album.title}</Typography>
            return <ExpandablePanel key={album.id} header={header}>
                List of photos in the Album
            </ExpandablePanel>
        })
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