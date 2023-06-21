import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './ProfileCardDeprecated.module.scss'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { CountrySelect } from '@/entities/Country'
import { CurrencySelect } from '@/entities/Currency'
import { ProfileCardProps } from '../ProfileCard/ProfileCard'
import { Loader } from '@/shared/ui/deprecated/Loader'
import { Text as TextDeprecated, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text'

export const ProfileCardDeprecatedSkeleton = () => (
  <HStack justify='center' max className={classNames(cls.ProfileCard, {}, [cls.loading])}>
    <Loader />
  </HStack>
)

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation('profile')
  return (
    <HStack justify='center' max className={classNames(cls.ProfileCard, {}, [cls.error])}>
      <TextDeprecated
        theme={TextTheme.ERROR}
        title={t('Произошла ошибка при загрузке профиля')}
        text={t('Попробуйте обновить страницу')}
        align={TextAlign.CENTER}
      />
    </HStack>
  )
}

export const ProfileCardDeprecated: FC<ProfileCardProps> = (props) => {
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

  const mods: Mods = {
    [cls.editing]: !readonly
  }

  return (
    <VStack gap='8' max className={classNames(cls.ProfileCardDeprecated, mods, [className])}>
      {data?.avatar && (
        <HStack justify='center' max>
          <AvatarDeprecated src={data?.avatar} />
        </HStack>
      )}
      <InputDeprecated
        value={data?.firstname}
        placeholder={t('Ваше имя')}
        onChange={onChangeFirstname}
        readonly={readonly}
        data-testid='ProfileCard.Firstname'
      />
      <InputDeprecated
        value={data?.lastname}
        placeholder={t('Ваша фамилия')}
        onChange={onChangeLastname}
        readonly={readonly}
        data-testid='ProfileCard.Lastname'
      />
      <InputDeprecated value={data?.age} placeholder={t('Ваш возраст')} onChange={onChangeAge} readonly={readonly} />
      <InputDeprecated
        value={data?.username}
        placeholder={t('Имя пользователя')}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <InputDeprecated value={data?.avatar} placeholder={t('Аватар')} onChange={onChangeAvatar} readonly={readonly} />
      <InputDeprecated value={data?.city} placeholder={t('Город')} onChange={onChangeCity} readonly={readonly} />
      <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} />
      <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} />
    </VStack>
  )
}
