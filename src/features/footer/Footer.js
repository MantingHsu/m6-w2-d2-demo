// src/features/footer/Footer.js
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  StatusFilters,
  statusFilterChanged,
  colorFilterToggled,
} from '../filters/filtersSlice'
import { allCompleted, completedCleared } from '../todos/todosSlice'
import { availableColors, capitalize } from '../filters/colors'

export default function Footer() {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos.entities)
  const filters = useSelector((state) => state.filters)

  const remaining = todos.filter((t) => !t.completed).length
  const itemWord = remaining === 1 ? 'item' : 'items'

  return (
    <footer className="footer" style={{ display: 'grid', gap: 12 }}>
      <span className="todo-count">
        <strong>{remaining}</strong> {itemWord} left
      </span>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <span>Status:</span>
        {[StatusFilters.All, StatusFilters.Active, StatusFilters.Completed].map((s) => (
          <label key={s} style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
            <input
              type="radio"
              name="status"
              checked={filters.status === s}
              onChange={() => dispatch(statusFilterChanged(s))}
            />
            {s}
          </label>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <span>Filter by color:</span>
        {availableColors.map((c) => {
          const checked = filters.colors.includes(c)
          return (
            <label key={c} style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) =>
                  dispatch(
                    colorFilterToggled({
                      color: c,
                      changeType: e.target.checked ? 'added' : 'removed',
                    })
                  )
                }
              />
              {capitalize(c)}
            </label>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={() => dispatch(allCompleted())}>Mark All Completed</button>
        <button onClick={() => dispatch(completedCleared())}>Clear Completed</button>
      </div>
    </footer>
  )
}
