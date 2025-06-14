import ExpandablePanel from "./ExpandablePanel";
import { Typography, IconButton } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove';
import { useDeleteAlbumsMutation } from "../store";
import PhotosList from "./PhotosList";
import ConfirmDialog from "./ConfirmDialog";
import { useState, useCallback } from "react";
import type { Album } from "../types/types";
export type operationType = "increment" | "decrement"
function AlbumsListItem({album}: {
    album: Album
}) {
    console.log("albumlistitem")
    const [deleteAlbum, {isLoading: isDeletingAlbum}] = useDeleteAlbumsMutation()
    const [albumPhotoCount, setAlbumPhotoCount] = useState(album._count.photos)
    const increaseAlbumPhotoCount = useCallback((toDo: operationType) => {
        console.log(albumPhotoCount);
        if(toDo === "increment"){
            setAlbumPhotoCount(prev => prev+1)
        } else {
            setAlbumPhotoCount(prev => prev-1)
        }
        
        console.log(albumPhotoCount);
    }, [])
    const handleDeleteAlbum = (album: Album) => {
        if(albumPhotoCount){ 
            setIsOpen(true)
        }
        else{
            console.log(albumPhotoCount);
            
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
            <PhotosList album={album} increaseAlbumPhotoCount={increaseAlbumPhotoCount}/>
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