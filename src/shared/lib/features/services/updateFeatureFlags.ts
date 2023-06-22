import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { FeatureFlags } from '@/shared/types/featureFlags'
import { updateFeatureFlags } from '../api/featureFlagsApi'
import { getAllFeatureFlags, setFeatureFlags } from '../lib/setGetFeatures'

interface UpdateFeatureFlagOptions {
  userId: string
  newFeatures: Partial<FeatureFlags>
}

export const updateFeatureFlag = createAsyncThunk<void, UpdateFeatureFlagOptions, ThunkConfig<string>>(
  'feature/updateFeatureFlag',
  async ({ userId, newFeatures }, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi

    const allFeatures = {
      ...getAllFeatureFlags(),
      ...newFeatures
    }

    try {
      await dispatch(
        updateFeatureFlags({
          userId,
          features: allFeatures
        })
      )

      setFeatureFlags(allFeatures)

      return undefined
    } catch (e) {
      console.log(e)
      return rejectWithValue('')
    }
  }
)
