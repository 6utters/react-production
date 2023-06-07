import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Select, SelectOption } from 'shared/ui/Select/Select'
import { ListBox } from 'shared/ui/ListBox/ListBox'
import { Country } from '../../model/types/country'

interface CountrySelectProps {
    className?: string
    value?: Country
    onChange?: (value: Country) => void
    readonly?: boolean
}

const options: SelectOption<Country>[] = [
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Ukraine, content: Country.Ukraine }
]

export const CountrySelect: FC<CountrySelectProps> = memo(({
  className, onChange, value, readonly
}) => {
  const { t } = useTranslation('profile')

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country)
  }, [onChange])

  return (
    <ListBox
      readonly={readonly}
      defaultValue={t('Страна')}
      label={t('Страна')}
      items={options}
      value={value}
      onChange={onChangeHandler}
      direction="top right"
    />
  )
})
