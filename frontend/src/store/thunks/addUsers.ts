import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const addUsers = createAsyncThunk('users/add', async (userData) => {
    const response = await axios.post('http://localhost:3000/addUsers', userData)
    await pause(1000)
    return response.data
})

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}

export {addUsers}