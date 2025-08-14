// src/features/todos/TodoList.js
import React from 'react'
import { useSelector } from 'react-redux'
import TodoListItem from './TodoListItem'
import { StatusFilters } from '../filters/filtersSlice'

function selectFilteredTodos(todos, filters) {
  let list = todos
  if (filters.status === StatusFilters.Active) {
    list = list.filter((t) => !t.completed)
  } else if (filters.status === StatusFilters.Completed) {
    list = list.filter((t) => t.completed)
  }
  if (filters.colors.length) {
    list = list.filter((t) => t.color && filters.colors.includes(t.color))
  }
  return list
}

export default function TodoList() {
  const todos = useSelector((state) => state.todos.entities)
  const filters = useSelector((state) => state.filters)
  const visibleTodos = selectFilteredTodos(todos, filters)

  return (
    <ul className="todo-list">
      {visibleTodos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
