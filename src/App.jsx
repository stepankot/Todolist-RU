import { Outlet, useNavigate } from 'react-router'
import { TaskContext } from './context'
import useGetTodos from './api/useTodos'
import { useState } from 'react'
import { updateTodo } from './api/useUpdateTodo'
import createdTodo from './api/useAddTodo'
import DeleteTodo from './api/useDeleteTodo'

export default function App() {
	const [refreshTodos, setRefreshTodos] = useState(false)
	const { todos, loading } = useGetTodos(refreshTodos)
	const navigate = useNavigate(null)

	const addTodo = todo => {
		createdTodo(todo)
		setRefreshTodos(!refreshTodos)
	}

	const deleteTodo = id => {
		DeleteTodo(id)
		setRefreshTodos(!refreshTodos)
		navigate(-1, { replace: true })
	}

	const onCreate = todo => {
		createdTodo(todo)

		setRefreshTodos(!refreshTodos)
	}

	const onStatusChange = todo => {
		const updatedTodo = {
			...todo,
			completed: !todo.completed
		}
		updateTodo(updatedTodo)
		setRefreshTodos(!refreshTodos)
	}

	const onUpdate = updTodo => {
		updateTodo(updTodo)
		setRefreshTodos(!refreshTodos)
	}

	const getTodo = id => {
		return todos?.find(todo => {
			return todo.id === id
		})
	}

	if (loading) return <div>Loading</div>

	const value = {
		todos,
		addTodo,
		deleteTodo,
		onStatusChange,
		onUpdate,
		getTodo,
		onCreate
	}

	return (
		<TaskContext value={value}>
			<div>
				<Outlet />
			</div>
		</TaskContext>
	)
}
