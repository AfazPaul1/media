import ExpandablePanel from "./ExpandablePanel";
import { Typography, IconButton } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove';
import { useDeleteAlbumsMutation } from "../store";
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
        List of photos in the Album
    </ExpandablePanel>
}

export default AlbumsListItem