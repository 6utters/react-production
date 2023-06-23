import { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import './Loader.scss'

interface LoaderProps {
  className?: string
}

/**
 * Use new UI components from redesigned
 * @deprecated
 */
export const Loader: FC<LoaderProps> = memo(({ className }) => (
  <div className={classNames('lds-ellipsis', {}, [className])}>
    <div />
    <div />
    <div />
    <div />
  </div>
))
