import {  useSelector} from "react-redux"
import {  useEffect } from "react"
import {fetchUsers, addUsers} from '../store'
import Skeleton1 from "./Skeleton1"
import { Stack, Grid, Typography } from "@mui/material"
import UsersListItem from './UsersListItem'
import AddIcon from '@mui/icons-material/Add';
import { faker } from '@faker-js/faker';
import useThunk from "../hooks/useThunk"
import Button1 from './Button1'
import type { RootState } from '../store'

function UsersList() {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUsers)
    
   
    const { data} = useSelector((state: RootState) => state.users)
    
    useEffect(() => {
        doFetchUsers()
    }, [doFetchUsers])

    let content;
    if (isLoadingUsers) {
        content = <Skeleton1 times={4} height={67} width={188}></Skeleton1>
    } else if (loadingUsersError) {
        content =  loadingUsersError
    } else {
        content = data.map(user => <UsersListItem key={user.id} user={user}></UsersListItem>)
        
    }
    const handleAddUser = () => {
       doCreateUser({
            name: faker.person.fullName(),
        })
    }
  
    return (
        <Grid >
            <Grid container spacing = {1} sx={{margin:2,}} justifyContent="center">
                <Grid size={4}>
                    <Typography variant="h5" color="initial">List of Users</Typography>
                </Grid>
                <Grid>
                    <Button1 loading={isCreatingUser} onClick={handleAddUser}>
                        <AddIcon></AddIcon>
                    </Button1>
                    {creatingUserError && creatingUserError}
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
                <Stack spacing={2}>
                    {content}
                </Stack>
                
            </Grid>          
        </Grid>  
    )
}

export default UsersList