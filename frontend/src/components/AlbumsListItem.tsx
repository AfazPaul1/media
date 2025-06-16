import ExpandablePanel from "./ExpandablePanel";
import { Typography, IconButton } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove';
import { useDeleteAlbumsMutation } from "../store";
import PhotosList from "./PhotosList";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";
import type { Album } from "../types/types";
import { useHasPhotos } from "../hooks/useHasPhotos";
import { useShouldRunQuery } from "../hooks/useShouldRunQuery";
function AlbumsListItem({album}: {
    album: Album
}) {
    console.log("albumlistitem")
    const [deleteAlbum, {isLoading: isDeletingAlbum}] = useDeleteAlbumsMutation()
    const {shouldRunQuery, onExpand} = useShouldRunQuery()
    const hasPhotos = useHasPhotos(album, shouldRunQuery);
    
    const handleDeleteAlbum = (album: Album) => {
        if(hasPhotos){ 
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
            <PhotosList album={album} onExpand={onExpand}/>
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