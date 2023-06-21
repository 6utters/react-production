import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { SelectOption } from '@/shared/ui/deprecated/Select'
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups'
import { Country } from '../../model/types/country'
import { ToggleFeatures } from '@/shared/lib/features'
import { ListBox } from '@/shared/ui/redesigned/Popups'

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

export const CountrySelect: FC<CountrySelectProps> = memo(({ className, onChange, value, readonly }) => {
  const { t } = useTranslation('profile')

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country)
    },
    [onChange]
  )

  const props = {
    className,
    value,
    readonly,
    items: options,
    onChange: onChangeHandler,
    defaultValue: t('Страна'),
    label: t('Страна'),
    direction: 'top right' as const
  }

  return <ToggleFeatures feature='isAppRedesigned' on={<ListBox {...props} />} off={<ListBoxDeprecated {...props} />} />
})
