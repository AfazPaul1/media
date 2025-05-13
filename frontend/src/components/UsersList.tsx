import { useDispatch, useSelector} from "react-redux"
import { useEffect } from "react"
import {fetchUsers} from '../store'
import Skeleton1 from "./Skeleton1"
import { Stack } from "@mui/material"
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
    return (
        <div>{data.length}</div>
    )
}

export default UsersList