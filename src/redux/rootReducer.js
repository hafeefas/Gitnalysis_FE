import { combineReducers } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import repoReducer from "./slices/repoSlice"

const rootReducer = combineReducers({ 
  user: userReducer,
  repo: repoReducer
})

export default rootReducer