import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {pause} from '../../hooks/useDelay'
import type { User } from "../../types/types";
    const response = await axios.post('http://localhost:3000/addUsers', userData)
    await pause(1000)
    return response.data
})


export {addUsers}