import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../const/const';

export const updateDesk = createAsyncThunk(
    'desks/updateDesk',
    async (data, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}desks/${data.deskId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify({ [data.field]: data.value }),
            });

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