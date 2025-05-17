import useThunk from "../hooks/useThunk"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {deleteUser} from '../store'
import { Grid, Typography, IconButton, Paper } from '@mui/material';
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

function UsersListItem({user}) {

    const [doDeleteUser, isDeletingUser, deletingUserError] = useThunk(deleteUser)
    const handleDeleteUser = (id) => {
        doDeleteUser(id)
    }

    const header = 
            <>
                <Grid size={2}>
                    <IconButton loading={isDeletingUser} onClick={() => handleDeleteUser(user.id)}>
                        <PersonRemoveIcon fontSize="large"/>
                    </IconButton>
                        
                </Grid>
                <Grid size={8} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography align="center">{user.name}</Typography>
                </Grid>
            </>

    return (        
                    <ExpandablePanel header={header}>
                        <AlbumsList user={user}></AlbumsList>
                    </ExpandablePanel>               
    )
}

export default UsersListItem