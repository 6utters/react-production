import { FC, ReactElement } from 'react'
import { FeatureFlags } from '@/shared/types/featureFlags'
import { getFeatureFlags } from '../setGetFeatures'

interface ToggleFeaturesProps {
  feature: keyof FeatureFlags
  on: ReactElement
  off: ReactElement
}

export const ToggleFeatures: FC<ToggleFeaturesProps> = (props) => {
  const { off, on, feature } = props

  if (getFeatureFlags(feature)) {
    return on
  }

  return off
}
