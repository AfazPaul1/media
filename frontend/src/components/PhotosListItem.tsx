import ExpandablePanel from "./ExpandablePanel";
import { Typography, IconButton } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove';
import { useDeletePhotosMutation } from "../store/apis/photosApi";
function PhotosListItem({photo}) {
    const [deletePhoto, {isLoading: isDeletingPhoto}] = useDeletePhotosMutation()
    const handleDeletePhoto = (photo) => {
        deletePhoto(photo)
    }
    return (
        <div className="flex flex-row justify-between mb-2 border rounded">
            <div className="basis-1/6">
                <IconButton loading={isDeletingPhoto} onClick={() => handleDeletePhoto(photo)}>
                    <RemoveIcon fontSize="small"/>
                </IconButton>
            </div>
            <div className="basis-5/6">
                <Typography align="left">{photo.url}</Typography>
            </div>
        </div>
    )
}

export default PhotosListItem
//loading={isDeletingAlbum} onClick={() => handleDeleteAlbum(album)}