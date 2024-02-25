import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../const/const';

export const fetchDeskById = createAsyncThunk(
    'desks/fetchDeskById',
    async (deskId, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}desks/${deskId}`);

            if (!response.ok) {
                throw new Error();
            } else {
                const newData = await response.json();
                return newData;
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);