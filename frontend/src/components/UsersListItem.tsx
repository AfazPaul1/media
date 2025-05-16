import useThunk from "../hooks/useThunk"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {deleteUser} from '../store'
import { Grid, Typography, IconButton, Paper } from '@mui/material';

function UsersListItem({user}) {

    const [doDeleteUser, isDeletingUser, deletingUserError] = useThunk(deleteUser)
    const handleDeleteUser = (id) => {
        doDeleteUser(id)
    }

    return (
        <Grid container justifyContent="center">
            <Grid size={6}>
                <Paper elevation={3} sx={{margin:1}}>
                <Grid  container  justifyContent="center">
                    <Grid size={2}>
                        <IconButton loading={isDeletingUser} onClick={() => handleDeleteUser(user.id)}>
                            <PersonRemoveIcon fontSize="large"/>
                        </IconButton>
                        
                    </Grid>
                    <Grid size={8} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography align="center">{user.name}</Typography>
                    </Grid>
                    <Grid size={2}>
                        <IconButton>
                            <ArrowDropDownIcon fontSize="large"/>
                        </IconButton>
                    </Grid>
                </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default UsersListItem