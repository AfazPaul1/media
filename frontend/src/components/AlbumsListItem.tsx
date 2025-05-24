import ExpandablePanel from "./ExpandablePanel";
import { Typography, IconButton } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove';
import { useDeleteAlbumsMutation } from "../store";
import PhotosList from "./PhotosList";
function AlbumsListItem({album}) {
    const [deleteAlbum, {isLoading: isDeletingAlbum}] = useDeleteAlbumsMutation()
    const handleDeleteAlbum = (album) => {
        deleteAlbum(album)
    }
    const header =
                    <>
                    <IconButton loading={isDeletingAlbum} onClick={() => handleDeleteAlbum(album)}>
                        <RemoveIcon fontSize="small"/>
                    </IconButton>
                    <Typography align="center">{album.title}</Typography>
                    </> 

        
    return <ExpandablePanel header={header}>
        <PhotosList album={album}/>
    </ExpandablePanel>
}

export default AlbumsListItem