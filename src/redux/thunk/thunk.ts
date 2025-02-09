import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {Contributor, Repo} from "./types";
export const getRepos = createAsyncThunk(
    'repos/getRepos',
    async (
        { searchQuery, currentPage, perPage }: { searchQuery: string, currentPage: number, perPage: number },
        { rejectWithValue }
    ) => {
        try {
            if (searchQuery.trim() === '') {
                searchQuery = 'stars:%3E1';
            }

            const response = await axios.get<{ items: Repo[] }>(
                `https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`
            );
            const remainingRequests = response.headers['x-ratelimit-remaining'];
            if (parseInt(remainingRequests) === 0) {
                return rejectWithValue('API rate limit exceeded');
            }
            return response.data.items;
        } catch (error) {
            return rejectWithValue('Error fetching repositories');
        }
    }
);

export const getContributors = createAsyncThunk(
    'repos/getContributors',
    async (
        { userName, repoName }: { userName: string, repoName: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get<Contributor[]>(
                `https://api.github.com/repos/${userName}/${repoName}/contributors?page=1&per_page=10`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue('Error fetching contributors');
        }
    }
);
export const getCurrentRepo = createAsyncThunk(
    'repos/getCurrentRepo',
    async (
        { userName, repoName }: { userName: string, repoName: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get<Repo>(
                `https://api.github.com/repos/${userName}/${repoName}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue('Error fetching the current repository');
        }
    }
);
