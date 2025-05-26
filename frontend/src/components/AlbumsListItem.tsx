import ExpandablePanel from "./ExpandablePanel";
import { Typography, IconButton } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove';
import { useDeleteAlbumsMutation } from "../store";
import PhotosList from "./PhotosList";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";
import { useFetchPhotosQuery } from "../store";
function AlbumsListItem({album}) {
    const [deleteAlbum, {isLoading: isDeletingAlbum}] = useDeleteAlbumsMutation()
    const {data: photos} = useFetchPhotosQuery(album)
   
    const handleDeleteAlbum = (album) => {
        console.log(photos.length, album);
        if(photos.length){
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