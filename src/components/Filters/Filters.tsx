import React, { useState } from 'react'
import s from './Filters.module.scss'
import { Button } from '@mui/material'
import cn from 'classnames'
import { FiltersProps } from '../../App'

export type SearchFormProps = {
  changeSearch: (term: string) => void
}

export type FiltersButtonType = {
  name: 'all' | 'active' | 'done',
  label: string
}

const FiltersButton: FiltersButtonType[] = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'done', label: 'Done' },
]

const Filters = ({ changeSearch, itemsFilter, changeFilter = () => { } }: FiltersProps & SearchFormProps) => {
  const [term, setTerm] = useState('')
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const termValue = e.currentTarget.value
    setTerm(termValue)
    changeSearch(termValue)
  }

  const buttons = FiltersButton.map(({ name, label }) => {
    const isActive = name === itemsFilter
    let btn = <Button variant='outlined' key={name} type='button'
      className={cn('btn ml10', isActive ? 'btn___active' : '')} onClick={() => changeFilter(name)}>{label}</Button>
    return btn
  })

  return (
    <form className={cn(s.SearchForm, 'w100')}>
      <input className={s.SearchForm_field} type='text'
        placeholder='Type to search' value={term}
        maxLength={35} onChange={changeValue} />
      <div className={cn(s.Filters, 'wrap', 'w100')}>
        {buttons}
      </div>
    </form>
  );
}

export default Filters