import { createSlice } from '@reduxjs/toolkit';
import { createDesk } from './api/createDesk';
import { fetchDesks } from './api/fetchDesks';
import { fetchDeskById } from './api/fetchDeskById';
import { updateDesk } from './api/updateDesk';

export const initialDesksState = {
    username: undefined,
    socket: undefined,
    desks: [],
    currentDesk: undefined,
    isLoading: false,
    error: undefined,
};

const desksSlice = createSlice({
    name: 'desks',
    initialState: initialDesksState,
    reducers: {
        setUsername(state, action) {
            state.username = action.payload;
        },
        addCurrentLines(state, action) {
            if (!state.currentDesk.lines) {
                state.currentDesk.lines = [action.payload];
            } else {
                state.currentDesk.lines = [...state.currentDesk.lines, action.payload];
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createDesk.pending, (state) => {
            state.error = undefined;
        });
        builder.addCase(createDesk.fulfilled, (state, action) => {
            state.desks = [...state.desks, action.payload];
        });
        builder.addCase(createDesk.rejected, (state, action) => {
            state.error = action.payload;
        });

        builder.addCase(fetchDesks.pending, (state) => {
            state.error = undefined;
        });
        builder.addCase(fetchDesks.fulfilled, (state, action) => {
            state.desks = action.payload;
        });
        builder.addCase(fetchDesks.rejected, (state, action) => {
            state.error = action.payload;
        });

        builder.addCase(fetchDeskById.pending, (state) => {
            state.error = undefined;
        });
        builder.addCase(fetchDeskById.fulfilled, (state, action) => {
            state.currentDesk = action.payload;
        });
        builder.addCase(fetchDeskById.rejected, (state, action) => {
            state.error = action.payload;
        });

        builder.addCase(updateDesk.pending, (state) => {
            state.error = undefined;
        });
        builder.addCase(updateDesk.fulfilled, (state, action) => {
            state.currentDesk = action.payload;
        });
        builder.addCase(updateDesk.rejected, (state, action) => {
            state.error = action.payload;
        });
    },

});

export const { actions: desksActions } = desksSlice;
export const { reducer: desksReducer } = desksSlice;