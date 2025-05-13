import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const addUsers = createAsyncThunk('users/add', async (userData) => {
    const response = await axios.post('http://localhost:3000/addUsers', userData)
    return response.data
})
export {addUsers}