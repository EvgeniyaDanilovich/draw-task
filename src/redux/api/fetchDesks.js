import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../const/const';

export const fetchDesks = createAsyncThunk(
    'desks/fetchDesks',
    async (data, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}desks`);
            console.log(response);

            if (!response.ok) {
                throw new Error();
            } else {
                const newData = await response.json();
                console.log(response);
                return newData;
            }

        }
        catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);