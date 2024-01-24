import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import expensesSlice from './features/expenses/expensesSlice'
import notesSlice from './features/notes/notesSlice'
import passwordsSlice from './features/passwords/passwordsSlice'
import tasksSlice from './features/tasks/tasksSlice'
import categoriesSlice from './features/categories/categoriesSlice'

export const makeStore = () => {
  return configureStore({

    reducer: {
      authReducer: authSlice,
      expensesReducer: expensesSlice,
      notesReducer: notesSlice,
      passwordsReducer: passwordsSlice,
      tasksReducer: tasksSlice,
      categoriesReducer: categoriesSlice
    }
  })
}