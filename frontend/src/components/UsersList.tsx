import {  useSelector} from "react-redux"
import { useEffect } from "react"
import {fetchUsers, addUsers} from '../store'
import Skeleton1 from "./Skeleton1"
import { Stack, Grid, Typography, Button } from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AddIcon from '@mui/icons-material/Add';
import { faker } from '@faker-js/faker';
import useThunk from "../hooks/useThunk"
import Button1 from './Button1'
import Paper from '@mui/material/Paper';


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
        content = data.map((user) => {
                    return (
                        <Grid key={user.id} container justifyContent="center">
                            <Grid size={6}>
                                <Paper elevation={3} sx={{margin:1}}>
                                <Grid  container  justifyContent="center">
                                    <Grid size={2}>
                                        <PersonRemoveIcon fontSize="large"/>
                                    </Grid>
                                    <Grid size={8}>
                                        <Typography align="center">{user.name}</Typography>
                                    </Grid>
                                    <Grid size={2}>
                                        <ArrowDropDownIcon fontSize="large"/>
                                    </Grid>
                                </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                        
                        )
                    })
        
    }
    const handleClick = () => {
       doCreateUser({
            name: faker.person.fullName()
        })
    }
   
    return (
        <div>
            <Grid container spacing = {2} sx={{margin:2,}} justifyContent="center">
                <Grid size={4}>
                    <Typography variant="h5" color="initial">List of Users</Typography>
                </Grid>
                <Grid>
                    <Button1 loading={isCreatingUser} onClick={handleClick}>
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