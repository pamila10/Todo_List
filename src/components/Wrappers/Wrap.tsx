import React from 'react'

type Props = {
  children: React.ReactNode,
  classes: string
}

export const Wrap = ({ children, classes }: Props) => {
  return (
    <div className={`wrap ${classes}`}>{children}</div>
  )
}