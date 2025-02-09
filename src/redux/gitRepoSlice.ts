import {getContributors, getCurrentRepo, getRepos} from "./thunk/thunk.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Contributor, Repo} from "./thunk/types.ts";


interface ReposState {
    items: Repo[];
    currentRepo: Repo | null;
    contributors: Contributor[];
    isFetching: boolean;
    fetchError: string | null;
    currentPage: number;
}

const initialState: ReposState = {
    items: [],
    currentRepo: null,
    contributors: [],
    isFetching: false,
    fetchError: null,
    currentPage: 1,
};
const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        resetRepos: (state) => {
            state.items = [];
            state.currentRepo = null;
            state.contributors = [];
            state.fetchError = null;
        }
    },
    extraReducers: (builder) => {
        builder
        builder
            .addCase(getRepos.pending, (state) => {
                state.isFetching = true;
                state.fetchError = null;
            })
            .addCase(getRepos.fulfilled, (state, action: PayloadAction<Repo[]>) => {
                state.isFetching = false;
                state.items = [...state.items, ...action.payload]; // добавляем новые репозитории
            })
            .addCase(getRepos.rejected, (state) => {
                state.isFetching = false;
                state.fetchError = 'Ошибка загрузки репозиториев';
            })
            .addCase(getContributors.pending, (state) => {
                state.isFetching = true;
                state.fetchError = null;
            })
            .addCase(getContributors.fulfilled, (state, action: PayloadAction<Contributor[]>) => {
                state.isFetching = false;
                state.contributors = action.payload;
            })
            .addCase(getContributors.rejected, (state, action) => {
                state.isFetching = false;
                state.fetchError = action.payload as string;
            })

            .addCase(getCurrentRepo.pending, (state) => {
                state.isFetching = true;
                state.fetchError = null;
            })
            .addCase(getCurrentRepo.fulfilled, (state, action: PayloadAction<Repo>) => {
                state.isFetching = false;
                state.currentRepo = action.payload;
            })
            .addCase(getCurrentRepo.rejected, (state, action) => {
                state.isFetching = false;
                state.fetchError = action.payload as string;
            });
    },
});
export const { resetRepos } = reposSlice.actions;
export default reposSlice.reducer;
