// src/features/header/Header.js
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { todoAdded } from '../todos/todosSlice'

export default function Header() {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    dispatch(todoAdded(trimmed))
    setText('')
  }

  return (
    <header className="header">
      <form onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </header>
  )
}
