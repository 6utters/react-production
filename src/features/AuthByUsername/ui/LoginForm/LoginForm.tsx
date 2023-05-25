import {
  FC, memo, useCallback
} from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { Input } from 'shared/ui/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import cls from './LoginForm.module.scss'

export interface LoginFormProps {
    className?: string
}

const initialReducers: ReducerList = {
  loginForm: loginReducer
}

const LoginForm: FC<LoginFormProps> = memo(({ className }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const username = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const isLoading = useSelector(getLoginIsLoading)
  const error = useSelector(getLoginError)

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }))
  }, [dispatch, username, password])

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('Форма авторизации')} />
        {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
        <Input
          type="text"
          className={cls.input}
          placeholder={t('Введите username')}
          autofocus
          value={username}
          onChange={onChangeUsername}
        />
        <Input
          type="text"
          className={cls.input}
          placeholder={t('Введите пароль')}
          value={password}
          onChange={onChangePassword}
        />
        <Button
          theme={ButtonTheme.OUTLINE}
          className={cls.login_btn}
          onClick={onLoginClick}
          disabled={isLoading}
        >
          {t('Войти')}
        </Button>
      </div>
    </DynamicModuleLoader>
  )
})

export default LoginForm
