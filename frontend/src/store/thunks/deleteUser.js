import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const deleteUser = createAsyncThunk('users/delete', async (id) => {
    const response = await axios.delete(`http://localhost:3000/users/${id}`)
    console.log(response);
    
    return response.data
})

export {deleteUser}