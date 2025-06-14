import ExpandablePanel from "./ExpandablePanel";
import { Typography, IconButton } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove';
import { useDeleteAlbumsMutation } from "../store";
import PhotosList from "./PhotosList";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";
import type { Album } from "../types/types";
function AlbumsListItem({album}: {
    album: Album
}) {
    console.log("albumlistitem")
    const [deleteAlbum, {isLoading: isDeletingAlbum}] = useDeleteAlbumsMutation()
    //const {data: photos} = useFetchPhotosQuery(album)// there were only 8 albumlistitem renders when i expanded user if i removed this. else there were 18
    //but this causes another issue now when i add a photo to an album and immediately delete that album it gets deleted no warning screen.
    //cause when we add photo only photo listen item rerenders not albumlist which has the fetchalbums query we would have to run it to get the updated photos count
    //one  idea is to invalidate that album so fetchalbums is called again
    //but photos and albums are separate apis and do not share a cache 
    //read a single api slice is better pattern
    const handleDeleteAlbum = (album: Album) => {
        if(album._count.photos){ //optional chaining
            setIsOpen(true)
        }
        else{
            deleteAlbum(album)
        }   
    }
    const [isOpen, setIsOpen] = useState(false)
    const header =
                    <>
                    <IconButton loading={isDeletingAlbum} onClick={() => handleDeleteAlbum(album)}>
                        <RemoveIcon fontSize="small"/>
                    </IconButton>
                    <Typography align="center">{album.title}</Typography>
                    </> 

        
    return (
    <>
        <ExpandablePanel header={header}>
            <PhotosList album={album}/>
        </ExpandablePanel>
        <ConfirmDialog 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        onConfirm={() => deleteAlbum(album)}
        title="Delete Album?"
        description="Deleting this album will also delete all associated photos. Are you sure you want to continue?"
        />
    </>
    )
}

export default AlbumsListItem