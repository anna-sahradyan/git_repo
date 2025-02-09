import {combineReducers} from "@reduxjs/toolkit";
import reposSlice from './gitRepoSlice';
export const rootReducer = combineReducers({
    repos: reposSlice

})
