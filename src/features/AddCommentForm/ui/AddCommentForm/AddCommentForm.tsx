import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice'
import { getAddCommentFormText } from '../../model/selectors/getAddCommentFormText/getAddCommentFormText'
import { getAddCommentFormError } from '../../model/selectors/getAddCommentFormError/getAddCommentFormError'
import cls from './AddCommentForm.module.scss'
import { ToggleFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/redesigned/Card'
import { Input } from '@/shared/ui/redesigned/Input'
import { Button } from '@/shared/ui/redesigned/Button'

export interface AddCommentFormProps {
  className?: string
  onSendComment: (value: string) => void
}

const reducers: ReducerList = {
  addCommentForm: addCommentFormReducer
}

const AddCommentForm: FC<AddCommentFormProps> = (props) => {
  const { className, onSendComment } = props
  const { t } = useTranslation('comment')
  const dispatch = useAppDispatch()
  const text = useSelector(getAddCommentFormText)
  const error = useSelector(getAddCommentFormError)

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value))
    },
    [dispatch]
  )

  const onSendHandler = useCallback(() => {
    onSendComment(text || '')
    onCommentTextChange('')
  }, [onSendComment, onCommentTextChange, text])

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <Card padding='24' border='rounded' max>
            <HStack
              data-testid='AddCommentForm'
              max
              gap='16'
              justify='between'
              className={classNames(cls.AddCommentFormRedesigned, {}, [className])}
            >
              <Input
                className={cls.input}
                placeholder={t('Введите текст комментария')}
                value={text}
                onChange={onCommentTextChange}
                data-testid='AddCommentForm.Input'
              />
              <Button onClick={onSendHandler} variant='outline' data-testid='AddCommentForm.Button'>
                {t('Отправить')}
              </Button>
            </HStack>
          </Card>
        }
        off={
          <HStack
            data-testid='AddCommentForm'
            max
            justify='between'
            className={classNames(cls.AddCommentForm, {}, [className])}
          >
            <InputDeprecated
              className={cls.input}
              placeholder={t('Введите текст комментария')}
              value={text}
              onChange={onCommentTextChange}
              data-testid='AddCommentForm.Input'
            />
            <ButtonDeprecated onClick={onSendHandler} theme={ButtonTheme.OUTLINE} data-testid='AddCommentForm.Button'>
              {t('Отправить')}
            </ButtonDeprecated>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  )
}

export default memo(AddCommentForm)
