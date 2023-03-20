import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import Header from './components/Header/Header'
import './App.scss'
import useLocalStorage from 'use-local-storage'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Wrap } from './components/Wrappers/Wrap'
import Filters from './components/Filters/Filters'
import ItemsList from './components/ItemsList/ItemsList'
import AddItemForm from './components/AddItemForm/AddItemForm'

export type TodoData = {
  id: string,
  label: string,
  important: boolean,
  done: boolean
}

export type ItemsFilter = 'all' | 'active' | 'done'

export type FiltersProps = {
  itemsFilter: ItemsFilter
  changeFilter: (itemsFilter: ItemsFilter) => void
}

type TermType = string

type State = {
  todoData: TodoData[],
  itemsFilter: ItemsFilter,
  term: TermType
}

const App = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [appTheme, setAppTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light')

  const switchTheme = () => {
    const newAppTheme = appTheme === 'light' ? 'dark' : 'light'
    setAppTheme(newAppTheme)
  }

  const state: State = {
    todoData: [
      { id: '1', label: 'Task 1', important: false, done: true },
      { id: '2', label: 'Task 2', important: true, done: false },
      { id: '3', label: 'Task 3', important: false, done: false }
    ],
    itemsFilter: 'all',
    term: '',
  }

  const value = localStorage.getItem('todolist')

  const [todoDataList, setTodoData] = useState<TodoData[]>(typeof value === 'string' ? JSON.parse(value) : state.todoData)
  const [itemsFilter, setFilter] = useState<ItemsFilter>('all')
  const [term, setTerm] = useState<TermType>('')

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(todoDataList));
  }, [todoDataList])

  const addItem = (text: string) => {
    const newItem = {
      id: nanoid(),
      label: text,
      important: false,
      done: false
    }

    setTodoData([...todoDataList, newItem])
  }

  const removeItem = (id: string) => {
    const remainingItems = todoDataList.filter(item => id !== item.id)
    setTodoData(remainingItems)
  }

  const toggleProperty = (arr: TodoData[], id: string, propName: string) => {
    return arr.map((item) => {
      if (id === item.id) {
        return { ...item, [propName]: !item[propName as keyof TodoData] }
      }
      return item
    })
  }

  const toggleDone = (id: string) => {
    setTodoData(toggleProperty(todoDataList, id, 'done'))
  }

  const toggleImportant = (id: string) => {
    setTodoData(toggleProperty(todoDataList, id, 'important'))
  }

  const editItem = (id: string, newText: string) => {
    const edited = todoDataList.map((item) => {
      if (id === item.id) {
        return { ...item, label: newText }
      }
      return item
    })
    setTodoData(edited)
  }

  const changeFilter = (itemsFilter: ItemsFilter) => {
    setFilter(itemsFilter)
  }

  const changeSearch = (term: TermType) => {
    setTerm(term)
  }

  const allItems = todoDataList.length

  const termValueToLowerCase = todoDataList.filter((item: TodoData) => {
    return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
  })


  const filterItemsList = (todoDataList: TodoData[], itemsFilter: ItemsFilter) => {
    switch (itemsFilter) {
      case 'all':
        return todoDataList
      case 'active':
        const filterActive = todoDataList.filter(item => !item.done)
        return filterActive
      case 'done':
        const filterDone = todoDataList.filter(item => item.done)
        return filterDone
      default:
        return []
    }
  }

  const searchItems = (todoDataList: TodoData[], term: TermType) => {
    if (term.length === 0) {
      return todoDataList;
    }
    return termValueToLowerCase
  }

  const visibleItems = searchItems(filterItemsList(todoDataList, itemsFilter), term)
  const doneItems = filterItemsList(todoDataList, 'done').length

  return (
    <div className='App' data-theme={appTheme}>
      <div className='App_container'>
        <IconButton onClick={switchTheme} color="inherit">
          {appTheme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        <Header allItems={allItems} doneItems={doneItems} />
        <main className='main'>
          <Wrap align='align-center'>
            <Filters changeSearch={changeSearch} itemsFilter={itemsFilter} changeFilter={changeFilter} />
          </Wrap>
          <Wrap direction='direction-column'>
            <ItemsList visibleItems={visibleItems} removeItem={removeItem}
              toggleDone={toggleDone} toggleImportant={toggleImportant}
              editItem={editItem} />
          </Wrap>
          <Wrap align='align-center'>
            <AddItemForm addItem={addItem} />
          </Wrap>
        </main>
      </div >
    </div >
  );
}

export default App
