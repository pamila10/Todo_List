import React from 'react'

type Props = {
  children: React.ReactNode,
  direction?: string,
  align?: string
}

export const Wrap = ({ children, direction, align }: Props) => {
  return (
    <div className={`wrap ${direction} ${align}`}>{children}</div>
  )
}