import { useCallback, useState } from "react"
import { useAppDispatch } from "./hooks"

function useThunk(thunk){
    const dispatch = useAppDispatch()
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
