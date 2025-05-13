import { useDispatch, useSelector} from "react-redux"
import { useEffect } from "react"
import {fetchUsers, addUsers} from '../store'
import Skeleton1 from "./Skeleton1"
import { Stack, Grid, Typography, Button } from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AddIcon from '@mui/icons-material/Add';
import { faker } from '@faker-js/faker';

function UsersList() {
    
    const dispatch = useDispatch()
    const {isLoading, data, error} = useSelector((state) => {
        return state.users
    })
    
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    if (isLoading) {
        return (
            <Stack sx={{m:4}} spacing={2}>
                <Skeleton1 times={4}></Skeleton1>
            </Stack>
            
        )
    }
    if (error) {
        return error.name
    }
    const handleClick = () => {
        dispatch(addUsers({
            name: faker.person.fullName()
        }))
    }
    const renderedList = data.map((user) => {
            return (
                    <Grid container spacing = {2} sx={{margin:2}} justifyContent="center">
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
                    <Button onClick={handleClick} variant="contained">
                    <AddIcon></AddIcon>
                    </Button>
                </Grid>
            </Grid>
             {renderedList}
        </div>
                   
        
    )
}

export default UsersList