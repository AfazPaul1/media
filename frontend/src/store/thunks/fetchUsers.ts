import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import {pause} from '../../hooks/useDelay'
import type { User } from "../../types/types";
const fetchUsers = createAsyncThunk<User[], void>('users/fetch', async () => {
    const response = await axios.get('http://localhost:3000/users')
    await pause(1000)
    return response.data
}) 

export {fetchUsers};