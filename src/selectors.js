export const selectTodoLoading = state => state.todos.loading
export const selectTodoError = state => state.todos.error
export const selectTodoItems = state => state.todos.items

export const selectSelectedTodo = state => state.selectedTodo
export const selectCurrentTodoLoading = state => state.selectedTodo.loading
export const selectFetchedStatus = state => state.selectedTodo.fetchedStatus
export const selectCurrentTodoError = state => state.selectedTodo.error
