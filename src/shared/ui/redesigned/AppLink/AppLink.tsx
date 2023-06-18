import { FC, memo, ReactNode } from 'react'
import { LinkProps, NavLink } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'

export type AppLinkVariant = 'primary' | 'red'

interface AppLinkProps extends LinkProps {
  className?: string
  variant?: AppLinkVariant
  children?: ReactNode
  activeClassName?: string
}

export const AppLink: FC<AppLinkProps> = memo((props) => {
  const { to, className, activeClassName = '', children, variant = 'primary', ...otherProps } = props
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames('', { [activeClassName]: isActive }, [className, cls[variant]])}
      {...otherProps}
    >
      {children}
    </NavLink>
  )
})
