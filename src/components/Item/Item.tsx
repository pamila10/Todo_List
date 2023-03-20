import React, { useEffect, useState } from 'react'
import { TodoData } from '../../App'
import s from './Item.module.scss'
import cn from 'classnames'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FmdBadOutlinedIcon from '@mui/icons-material/FmdBadOutlined'
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { Wrap } from '../Wrappers/Wrap'

type ItemProps = {
  removeItem: (id: string) => void
  toggleDone: (id: string) => void
  toggleImportant: (id: string) => void
  editItem: (id: string, newText: string) => void
}

const Item = (props: TodoData & ItemProps) => {
  const { id, label, done, important, editItem, removeItem, toggleDone, toggleImportant } = props
  const [isEditing, setEditing] = useState(false)
  const [newText, setNewText] = useState(label)
  const [isChecked, setIsChecked] = useState(done)

  useEffect(() => {
    setNewText(label)
  }, [label])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewText(e.currentTarget.value)
  }

  const activateEditMode = () => {
    setEditing(true)
  }

  const deactivateEditMode = () => {
    setEditing(false)
    editItem(id, newText)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const classNames = cn(s.Item_label, 'w100', done ? s.Item_label___done : '',
    important ? s.Item_label___imp : '')

  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} placement="top" arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  const viewTemplate = (
    <>
      <BootstrapTooltip title="Done">
        <input type="checkbox" checked={isChecked}
          onChange={() => {
            setIsChecked(!done)
            toggleDone(id)
          }} />
      </BootstrapTooltip>
      <span className={classNames}>{label}</span>
      <BootstrapTooltip title="Edit">
        <IconButton type='button' onClick={activateEditMode} aria-label="edit" color="primary">
          <EditIcon />
        </IconButton>
      </BootstrapTooltip>
    </>
  )

  const editTemplate = (
    <>
      <input className={cn(s.Item_field, 'w100')} onChange={handleChange}
        value={newText} autoFocus={true} maxLength={35} />
      <BootstrapTooltip title="Save">
        <IconButton type='submit' onClick={deactivateEditMode} aria-label="save" color="primary">
          <BeenhereOutlinedIcon />
        </IconButton>
      </BootstrapTooltip>
    </>
  )

  return (
    <form onSubmit={handleSubmit}>
      <Wrap align='align-center'>
        {isEditing ? editTemplate : viewTemplate}
        <BootstrapTooltip title="Important">
          <IconButton type='button' onClick={() => toggleImportant(id)} aria-label="important" color="primary">
            <FmdBadOutlinedIcon />
          </IconButton>
        </BootstrapTooltip>
        <BootstrapTooltip title="Delete">
          <IconButton type='button' onClick={() => removeItem(id)} aria-label="delete" color="primary">
            <DeleteIcon />
          </IconButton>
        </BootstrapTooltip>
      </Wrap>
    </form>
  )
}

export default Item