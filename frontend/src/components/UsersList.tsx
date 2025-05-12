import { useDispatch, useSelector} from "react-redux"
import { useEffect } from "react"
import {fetchUsers} from '../store'
function UsersList() {
    const dispatch = useDispatch()
    const {isLoading, data, error} = useSelector((state) => {
        return state.users
    })
    
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    if (isLoading) {
        return 'loading'
    }
    if (error) {
        return error.name
    }
    return (
        <div>{data.length}</div>
    )
}

export default UsersList