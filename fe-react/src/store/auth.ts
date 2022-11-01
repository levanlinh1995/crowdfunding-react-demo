import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/store'
import { IAuthMe } from '@/common/ts/interfaces/auth'

const initialState = {} as IAuthMe

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuthMe>) => ({ ...state, ...action.payload }),
    resetCredentials: () => initialState,
  },
})

// Action creators are generated for each case reducer function
export const { setCredentials, resetCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth
