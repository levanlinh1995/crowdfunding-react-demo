import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import campaignReducer from './campaign'

const rootReducer = combineReducers({
  auth: authReducer,
  campaign: campaignReducer
})

export const setupStore = () =>
  configureStore({
    reducer: rootReducer
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
