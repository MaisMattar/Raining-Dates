/** @format */

import { combineReducers } from "redux";
import { updateUserStatus } from "./userStatus";

export const rootReducer = combineReducers({ updateUserStatus });

export type RootState = ReturnType<typeof rootReducer>;
