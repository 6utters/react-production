import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { SelectOption } from '@/shared/ui/deprecated/Select'
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups'
import { Currency } from '../../model/types/currency'
import { ToggleFeatures } from '@/shared/lib/features'
import { ListBox } from '@/shared/ui/redesigned/Popups'

interface CurrencySelectProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
}

const options: SelectOption<Currency>[] = [
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.BYN, content: Currency.BYN },
  { value: Currency.RUB, content: Currency.RUB }
]

export const CurrencySelect: FC<CurrencySelectProps> = memo(({ className, onChange, value, readonly }) => {
  const { t } = useTranslation('profile')

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency)
    },
    [onChange]
  )

  const props = {
    className,
    value,
    readonly,
    items: options,
    onChange: onChangeHandler,
    defaultValue: t('Валюта'),
    label: t('Валюта'),
    direction: 'top right' as const
  }

  return <ToggleFeatures feature='isAppRedesigned' on={<ListBox {...props} />} off={<ListBoxDeprecated {...props} />} />
})
