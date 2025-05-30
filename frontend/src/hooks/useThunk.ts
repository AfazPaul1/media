import { useDispatch } from "react-redux"
import { useCallback, useState } from "react"
import type { AppDispatch } from "../store"

function useThunk(thunk){
    const dispatch = useDispatch<AppDispatch>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError ] = useState("")
    const runThunk = useCallback((arg) => {
        setIsLoading(true)
        dispatch(thunk(arg))
        .unwrap()
        .catch(() => setError('error'))
        .finally(() => setIsLoading(false))
    }, [dispatch, thunk])

    return [runThunk, isLoading, error]
}

export default useThunk
