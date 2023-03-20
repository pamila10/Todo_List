import Item from "../Item/Item"
import { TodoData } from '../../App'

export type ItemListProps = {
  visibleItems: TodoData[]
  removeItem: (id: string) => void
  toggleDone: (id: string) => void
  toggleImportant: (id: string) => void
  editItem: (id: string, newText: string) => void
}

const ItemsList = ({ visibleItems, removeItem, toggleDone, toggleImportant, editItem }: ItemListProps) => {

  const elems = visibleItems.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Item key={id} id={id} {...itemProps} toggleDone={toggleDone}
        toggleImportant={toggleImportant}
        removeItem={removeItem} editItem={editItem} />
    )
  })

  return (
    <>
      {elems}
    </>
  )
}

export default ItemsList
