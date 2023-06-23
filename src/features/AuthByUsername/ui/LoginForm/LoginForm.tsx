import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { ToggleFeatures } from '@/shared/lib/features'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Input } from '@/shared/ui/redesigned/Input'
import { Button } from '@/shared/ui/redesigned/Button'
import cls from './LoginForm.module.scss'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { useForceUpdate } from '@/shared/lib/render/forceUpdate'

export interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const initialReducers: ReducerList = {
  loginForm: loginReducer
}

const LoginForm: FC<LoginFormProps> = memo(({ className, onSuccess }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const username = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const isLoading = useSelector(getLoginIsLoading)
  const error = useSelector(getLoginError)
  const forceUpdate = useForceUpdate()

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value))
    },
    [dispatch]
  )

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value))
    },
    [dispatch]
  )

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }))
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess()
      forceUpdate()
    }
  }, [dispatch, username, password, onSuccess, forceUpdate])

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <VStack className={classNames(cls.LoginForm, {}, [className])} gap='16'>
            <Text title={t('Форма авторизации')} />
            {error && <Text text={t('Вы ввели неверный логин или пароль')} variant='error' />}
            <Input
              type='text'
              className={cls.input}
              placeholder={t('Введите username')}
              autofocus
              value={username}
              onChange={onChangeUsername}
            />
            <Input
              type='text'
              className={cls.input}
              placeholder={t('Введите пароль')}
              value={password}
              onChange={onChangePassword}
            />
            <Button variant='clear' className={cls.login_btn} onClick={onLoginClick} disabled={isLoading}>
              {t('Войти')}
            </Button>
          </VStack>
        }
        off={
          <div className={classNames(cls.LoginForm, {}, [className])}>
            <TextDeprecated title={t('Форма авторизации')} />
            {error && <TextDeprecated text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
            <InputDeprecated
              type='text'
              className={cls.input}
              placeholder={t('Введите username')}
              autofocus
              value={username}
              onChange={onChangeUsername}
            />
            <InputDeprecated
              type='text'
              className={cls.input}
              placeholder={t('Введите пароль')}
              value={password}
              onChange={onChangePassword}
            />
            <ButtonDeprecated
              theme={ButtonTheme.OUTLINE}
              className={cls.login_btn}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t('Войти')}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoader>
  )
})

export default LoginForm
