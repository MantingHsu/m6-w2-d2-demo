// src/features/todos/TodoListItem.js
import React from 'react'
import { useDispatch } from 'react-redux'
import {
  todoToggled,
  todoDeleted,
  todoColorSelected,
} from './todosSlice'
import { availableColors, capitalize } from '../filters/colors'

export default function TodoListItem({ todo }) {
  const dispatch = useDispatch()
  const { id, text, completed, color } = todo

  return (
    <li className={`todo ${completed ? 'completed' : ''}`}>
      <div className="view" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(todoToggled(id))}
        />
        <span style={{ flex: 1 }}>{text}</span>

        <select
          aria-label="Select color"
          value={color || ''}
          onChange={(e) =>
            dispatch(
              todoColorSelected({ todoId: id, color: e.target.value || null })
            )
          }
        >
          <option value="">No color</option>
          {availableColors.map((c) => (
            <option key={c} value={c}>
              {capitalize(c)}
            </option>
          ))}
        </select>

        <button className="destroy" onClick={() => dispatch(todoDeleted(id))}>
          Delete
        </button>
      </div>
    </li>
  )
}
