import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const deleteUser = createAsyncThunk('users/delete', async (id) => {
    const response = await axios.delete(`http://localhost:3000/users/${id}`)
    console.log(response);
    await pause(1000)
    return response.data
})
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}
export {deleteUser}