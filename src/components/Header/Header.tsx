import s from './Header.module.scss'

export type Props = {
  allItems: number
  doneItems: number
}

const Header = ({ allItems, doneItems }: Props) => {
  return (
    <header className={s.Header}>
      <h1>Todo List</h1>
      <h2>{doneItems} of {allItems} done</h2>
    </header>
  )
}

export default Header
