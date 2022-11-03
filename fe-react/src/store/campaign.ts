import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/store'
import { ICampaign } from '@/common/ts/interfaces/campaign'
import { ListResponse } from '@/common/ts/interfaces/common'

export interface CampaignState {
  loading: boolean;
  list: ICampaign[];
}

const initialState: CampaignState = {
  loading: false,
  list: []
}

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    fetchCampaignList(state) {
      state.loading = true;
    },
    fetchCampaignListSuccess(state, action: PayloadAction<ListResponse<ICampaign>>) {
      state.list = action.payload.data;
      state.loading = false;
    },
    fetchCampaignFailed(state) {
      state.loading = false;
    },
  },
})

// Actions
export const campaignActions = campaignSlice.actions

// Selectors
export const selectCampaignList = (state: RootState) => state.campaign.list

// Reducer
const campaignReducer = campaignSlice.reducer

export default campaignReducer

