import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../const/const';

export const fetchDesks = createAsyncThunk(
    'desks/fetchDesks',
    async (data, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}desks`);
            console.log(response);
            // const newData = await response.json();
            // return newData;


            if (!response.ok) {
                console.log(response);
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