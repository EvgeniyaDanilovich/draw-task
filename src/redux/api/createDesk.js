import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../const/const';

export const createDesk = createAsyncThunk(
    'desks/createDesk',
    async (data, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}desks`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ title: data }),
            });

            if (!response.ok) {
                throw new Error();
            } else {
                const newData = await response.json();
                console.log(newData);
                return newData;
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);