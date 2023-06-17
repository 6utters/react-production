import { buildSelector } from '@/shared/lib/store'
import { JsonSettings } from '../../types/jsonSettings'

export const [useJsonSettingsByKey, getUserJsonSettingsByKey] = buildSelector(
  (state, key: keyof JsonSettings) => state.user?.authData?.jsonSettings?.[key]
)
