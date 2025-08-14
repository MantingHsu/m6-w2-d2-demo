// src/features/todos/todosSlice.js
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'

// Simple localStorage-based fetch so index.js's fetchTodos() works immediately
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const saved = localStorage.getItem('todos')
  return saved ? JSON.parse(saved) : []
})

const save = (state) =>
  localStorage.setItem('todos', JSON.stringify(state.entities))

const todosSlice = createSlice({
  name: 'todos',
  initialState: { entities: [], status: 'idle' },
  reducers: {
    todoAdded: {
      reducer(state, action) {
        state.entities.push(action.payload)
        save(state)
      },
      prepare(text) {
        return {
          payload: { id: nanoid(), text, completed: false, color: null },
        }
      },
    },
    todoToggled(state, action) {
      const todo = state.entities.find((t) => t.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
        save(state)
      }
    },
    todoColorSelected(state, action) {
      const { todoId, color } = action.payload
      const todo = state.entities.find((t) => t.id === todoId)
      if (todo) {
        todo.color = color
        save(state)
      }
    },
    todoDeleted(state, action) {
      state.entities = state.entities.filter((t) => t.id !== action.payload)
      save(state)
    },
    allCompleted(state) {
      state.entities.forEach((t) => (t.completed = true))
      save(state)
    },
    completedCleared(state) {
      state.entities = state.entities.filter((t) => !t.completed)
      save(state)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.entities = action.payload || []
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const {
  todoAdded,
  todoToggled,
  todoColorSelected,
  todoDeleted,
  allCompleted,
  completedCleared,
} = todosSlice.actions

export default todosSlice.reducer
