import { useCallback, useMemo, useState } from 'react'

interface UserHoverBinds {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

type useHoverResult = [boolean, UserHoverBinds]

export function useHover(): useHoverResult {
  const [isHover, setIsHover] = useState(false)

  const onMouseEnter = useCallback(() => {
    setIsHover(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsHover(false)
  }, [])

  return useMemo(
    () => [isHover, { onMouseEnter, onMouseLeave }],
    [isHover, onMouseEnter, onMouseLeave]
  )
}
