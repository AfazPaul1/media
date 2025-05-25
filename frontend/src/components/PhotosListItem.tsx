import ExpandablePanel from "./ExpandablePanel";
import { Typography, IconButton } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove';
function PhotosListItem({photo}) {
    return (
        <div className="flex flex-row justify-between mb-2 border rounded">
            <div className="basis-1/6">
                <IconButton >
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