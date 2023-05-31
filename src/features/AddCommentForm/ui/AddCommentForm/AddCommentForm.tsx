import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Input } from 'shared/ui/Input/Input'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice'
import {
  getAddCommentFormText
} from '../../model/selectors/getAddCommentFormText/getAddCommentFormText'
import {
  getAddCommentFormError
} from '../../model/selectors/getAddCommentFormError/getAddCommentFormError'
import cls from './AddCommentForm.module.scss'

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

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value))
  }, [dispatch])

  const onSendHandler = useCallback(() => {
    onSendComment(text || '')
    onCommentTextChange('')
  }, [onSendComment, onCommentTextChange, text])

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input
          className={cls.input}
          placeholder={t('Введите текст комментария')}
          value={text}
          onChange={onCommentTextChange}
        />
        <Button
          onClick={onSendHandler}
          theme={ButtonTheme.OUTLINE}
        >
          {t('Отправить')}
        </Button>
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(AddCommentForm)
