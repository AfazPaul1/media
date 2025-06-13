import {useThunk} from "../hooks/useThunk"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {deleteUser} from '../store'
import { Typography, IconButton } from '@mui/material';
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";
import type { User } from "../types/types";
let userListItemRenderCount = 0
function UsersListItem({user}: {user:User}) {
    //the object being destructured has a property named user which is of type User.
    userListItemRenderCount++
    console.log("userListItemRenderCount ", userListItemRenderCount);
    const [doDeleteUser, isDeletingUser] = useThunk(deleteUser)
    const handleDeleteUser = (id: number) => {
        doDeleteUser(id)
    }

    const header = 
            <> 
                    <IconButton loading={isDeletingUser} onClick={() => handleDeleteUser(user.id)}>
                        <PersonRemoveIcon fontSize="large"/>
                    </IconButton>
                    <Typography align="center">{user.name}</Typography>
            </>

    return (        
                    <ExpandablePanel header={header}>
                        <AlbumsList user={user}></AlbumsList>
                    </ExpandablePanel>               
    )
}

export default UsersListItem