import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'

const rootReducer = combineReducers({
  auth: authReducer
})

export const setupStore = () =>
  configureStore({
    reducer: rootReducer
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
