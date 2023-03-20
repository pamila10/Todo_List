import React, { useRef, useState } from 'react'
import s from './AddItemForm.module.scss'
import cn from 'classnames'
import { Button } from '@mui/material'

export type AddItemProps = {
  addItem: (text: string) => void
}

const AddItemForm = ({ addItem }: AddItemProps) => {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (text.length > 0) {
      addItem(text)
    }
    setText('')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={cn(s.AddItem_form, 'w100')}>
        <input className={s.AddItem_field} autoFocus type='text' maxLength={35}
          placeholder='What needs to be done?' onChange={handleChange}
          value={text} ref={inputRef} />
        <Button variant='contained' type='submit' onClick={() => inputRef.current ? inputRef.current.focus() : false}>Add</Button>
      </form>
    </>
  );
}

export default AddItemForm