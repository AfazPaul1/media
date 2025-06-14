import { IconButton } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove';
import ImageListItem from '@mui/material/ImageListItem';
import { useDeletePhotosMutation } from "../store";
import type { Photo } from "../types/types";
function PhotosListItem({photo}: {
        photo: Photo
    }) 
    {
    console.log("photolistitem")
    const [deletePhoto, {isLoading: isDeletingPhoto}] = useDeletePhotosMutation()
    const handleDeletePhoto = (photo: Photo) => {
        deletePhoto(photo)
    }
    return (
        <ImageListItem rows={1}>
            <img  src={photo.url} alt="random pic"></img>
            <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
                <IconButton loading={isDeletingPhoto} onClick={() => handleDeletePhoto(photo)}>
                    <RemoveIcon fontSize="large"/>
                </IconButton>
            </div>
        </ImageListItem>
    )
}

export default PhotosListItem
