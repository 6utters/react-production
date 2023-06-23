import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ProfileCardProps } from '../ProfileCard/ProfileCard'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Input } from '@/shared/ui/redesigned/Input'
import { CountrySelect } from '@/entities/Country'
import { CurrencySelect } from '@/entities/Currency'
import { Card } from '@/shared/ui/redesigned/Card'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { Text } from '@/shared/ui/redesigned/Text'

export const ProfileRedesignedSkeleton = () => (
  <Card padding='24' max>
    <VStack gap='32'>
      <HStack max justify='center'>
        <Skeleton border='100%' width={128} height={128} />
      </HStack>
      <HStack gap='32' max>
        <VStack gap='16' max>
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
        </VStack>
        <VStack gap='16' max>
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
        </VStack>
      </HStack>
    </VStack>
  </Card>
)

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('profile')
  return (
    <HStack justify='center' max>
      <Text
        variant='error'
        title={t('Произошла ошибка при загрузке профиля')}
        text={t('Попробуйте обновить страницу')}
        align='center'
      />
    </HStack>
  )
}

export const ProfileCardRedesigned: FC<ProfileCardProps> = memo((props) => {
  const {
    data,
    className,
    onChangeCurrency,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeCountry,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername
  } = props
  const { t } = useTranslation('profile')

  return (
    <Card padding='24' border='partial' max className={className}>
      <VStack gap='32'>
        {data?.avatar && (
          <HStack justify='center' max>
            <Avatar size={128} src={data?.avatar} />
          </HStack>
        )}

        <HStack gap='24' max>
          <VStack gap='16' max>
            <Input
              value={data?.firstname}
              label={t('Ваше имя')}
              onChange={onChangeFirstname}
              readonly={readonly}
              data-testid='ProfileCard.Firstname'
            />
            <Input
              value={data?.lastname}
              label={t('Ваша фамилия')}
              onChange={onChangeLastname}
              readonly={readonly}
              data-testid='ProfileCard.Lastname'
            />
            <Input value={data?.age} label={t('Ваш возраст')} onChange={onChangeAge} readonly={readonly} />
            <Input
              value={data?.username}
              label={t('Имя пользователя')}
              onChange={onChangeUsername}
              readonly={readonly}
            />
          </VStack>
          <VStack gap='16' max>
            <Input value={data?.avatar} label={t('Аватар')} onChange={onChangeAvatar} readonly={readonly} />
            <Input value={data?.city} label={t('Город')} onChange={onChangeCity} readonly={readonly} />
            <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} />
            <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  )
})
