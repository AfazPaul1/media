import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {pause} from '../../hooks/useDelay'
const deleteUser = createAsyncThunk<{message: string, deletedId: number}, number>('users/delete', async (id) => {
    const response = await axios.delete(`http://localhost:3000/users/${id}`)
    console.log(response);
    await pause(1000)
    return response.data
})
export {deleteUser}