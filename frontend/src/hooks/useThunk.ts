import { useCallback, useState } from "react"
import { useAppDispatch } from "./hooks"
import type { AsyncThunkAction } from "@reduxjs/toolkit"

export function useThunk<U>(thunk: () => AsyncThunkAction<U, void, object>): readonly [() => void, boolean, string]
export function useThunk<T, U>(thunk: (arg: T) => AsyncThunkAction<U, T, object>): readonly [(arg: T) => void, boolean, string]
export function  useThunk<T, U>(
  thunk: ((arg: T) => AsyncThunkAction<U, T, object>) | (() => AsyncThunkAction<U, void, object>)
) {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const runThunk = useCallback((arg?: T) => {
    setIsLoading(true)
    if (arg !== undefined) {
      console.log("add or delete user");
      
    } else {
      console.log("fetchuser");
      
    }
    const result: AsyncThunkAction<U, T | void, object> =
      typeof arg !== 'undefined'
        ? (thunk as (arg: T) => AsyncThunkAction<U, T, object>)(arg)
        : (thunk as () => AsyncThunkAction<U, void, object>)()

    // Explicit cast fixes the overload error or we could type result
    //dispatch(result as AsyncThunkAction<U, T | void, object>)
    dispatch(result)
      .unwrap()
      .catch(() => setError("error"))
      .finally(() => setIsLoading(false))
  }, [dispatch, thunk])

  return [runThunk, isLoading, error] as const
}
//readonly in return type means its a readonly tuple cannot reassign elements after tuple created
//in our overload signatures we decalred the return as readonly hence in our implementation we must do const assertion for our return else there will signature mismatch