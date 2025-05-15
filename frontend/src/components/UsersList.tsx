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



function UsersList() {
    
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUsers)
   
    const { data,} = useSelector((state) => {
        return state.users
    })
    
    useEffect(() => {
        doFetchUsers()
    }, [doFetchUsers])

    if (isLoadingUsers) {
        return (
            <Stack sx={{m:4}} spacing={2}>
                <Skeleton1 times={4}></Skeleton1>
            </Stack>
            
        )
    }
    if (loadingUsersError) {
        return loadingUsersError
    }
    const handleClick = () => {
       doCreateUser({
            name: faker.person.fullName()
        })
    }
   
    
    const renderedList = data.map((user) => {
            return (
                    <Grid key={user.id} container spacing = {2} sx={{margin:2}} justifyContent="center">
                        <Grid size={1}>
                            <PersonRemoveIcon fontSize="large"/>
                        </Grid>
                        <Grid size={4}>
                            <Typography align="center">{user.name}</Typography>
                        </Grid>
                        <Grid size={1}>
                            <ArrowDropDownIcon fontSize="large"/>
                        </Grid>
                    </Grid>
                )
            })

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
             {renderedList}
        </div>
                   
        
    )
}

export default UsersList