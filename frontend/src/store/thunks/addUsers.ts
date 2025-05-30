import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {pause} from '../../hooks/useDelay'
const addUsers = createAsyncThunk('users/add', async (userData) => {
    const response = await axios.post('http://localhost:3000/addUsers', userData)
    await pause(1000)
    return response.data
})


export {addUsers}