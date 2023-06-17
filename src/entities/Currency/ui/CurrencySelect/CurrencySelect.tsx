import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { SelectOption } from '@/shared/ui/Select'
import { ListBox } from '@/shared/ui/Popups'
import { Currency } from '../../model/types/currency'

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

export const CurrencySelect: FC<CurrencySelectProps> = memo(
  ({ className, onChange, value, readonly }) => {
    const { t } = useTranslation('profile')

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency)
      },
      [onChange]
    )

    return (
      <ListBox
        readonly={readonly}
        defaultValue={t('Валюта')}
        label={t('Валюта')}
        items={options}
        value={value}
        onChange={onChangeHandler}
        direction='top right'
      />
    )
  }
)
