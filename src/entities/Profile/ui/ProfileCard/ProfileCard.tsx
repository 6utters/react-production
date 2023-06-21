import { FC } from 'react'
import { Currency } from '@/entities/Currency'
import { Country } from '@/entities/Country'
import { Profile } from '../../model/types/profile'
import { ToggleFeatures } from '@/shared/lib/features'
import {
  ProfileCardDeprecated,
  ProfileCardDeprecatedError,
  ProfileCardDeprecatedSkeleton
} from '../ProfileCardDeprecated/ProfileCardDeprecated'
import {
  ProfileCardRedesigned,
  ProfileCardRedesignedError,
  ProfileRedesignedSkeleton
} from '../ProfileCardRedesigned/ProfileCardRedesigned'

export interface ProfileCardProps {
  className?: string
  data?: Profile
  isLoading?: boolean
  error?: string
  readonly?: boolean
  onChangeFirstname?: (firstname?: string) => void
  onChangeLastname?: (lastname?: string) => void
  onChangeAge?: (age?: string) => void
  onChangeAvatar?: (avatar?: string) => void
  onChangeUsername?: (username?: string) => void
  onChangeCurrency?: (currency: Currency) => void
  onChangeCity?: (city?: string) => void
  onChangeCountry?: (country: Country) => void
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
  const { isLoading, error } = props

  if (isLoading) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<ProfileRedesignedSkeleton />}
        off={<ProfileCardDeprecatedSkeleton />}
      />
    )
  }

  if (error) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<ProfileCardRedesignedError />}
        off={<ProfileCardDeprecatedError />}
      />
    )
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<ProfileCardRedesigned {...props} />}
      off={<ProfileCardDeprecated {...props} />}
    />
  )
}
