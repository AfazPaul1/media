import { Grid, Typography, IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
function AlbumsList({user}) {
    return (
        <Grid container justifyContent="center">
            <Grid size={6} sx={{pr:1,pl:2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid size={7}>
                    <Typography sx={{fontSize: '12px'}}>Albums By {user.name}</Typography>
                </Grid>
                <Grid size={3}></Grid>
                <Grid size={2}>
                    <IconButton>
                        <AddIcon></AddIcon>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AlbumsList