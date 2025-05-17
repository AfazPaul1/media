import {  useSelector} from "react-redux"
import {  useEffect } from "react"
import {fetchUsers, addUsers, deleteUser} from '../store'
import Skeleton1 from "./Skeleton1"
import { Stack, Grid, Typography, Button } from "@mui/material"
import UsersListItem from './UsersListItem'
import AddIcon from '@mui/icons-material/Add';
import { faker } from '@faker-js/faker';
import useThunk from "../hooks/useThunk"
import Button1 from './Button1'


function UsersList() {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUsers)
    
   
    const { data} = useSelector((state) => state.users)
    
    useEffect(() => {
        doFetchUsers()
    }, [doFetchUsers])

    let content;
    if (isLoadingUsers) {
        content = (<Stack  sx={{m:2, justifyContent: "center",alignItems: "center",}} spacing={2}>
                    <Skeleton1 times={4}></Skeleton1>
                </Stack>)
    } else if (loadingUsersError) {
        content =  loadingUsersError
    } else {
        content = data.map(    user => <UsersListItem key={user.id} user={user}></UsersListItem>)
        
    }
    const handleAddUser = () => {
       doCreateUser({
            name: faker.person.fullName(),
            albumsData: Array.from({ length: 2 }).map(() => ({
                title: faker.music.album(),
                photos: {
                    create: Array.from({ length: 1 }).map(() => ({
                    url: faker.image.url(),
                    })),
                },
                }))
        })
    }
  
    return (
        <div>
            <Grid container spacing = {2} sx={{margin:2,}} justifyContent="center">
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
            {content}           
        </div>    
    )
}

export default UsersList