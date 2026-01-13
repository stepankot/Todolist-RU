import { Navigate, Outlet, useNavigate, useParams } from 'react-router'
import { TaskContext } from './context'
import { useEffect, useState } from 'react'
import { updateTodo } from './api/useUpdateTodo'
import createdTodo from './api/useAddTodo'
import DeleteTodo from './api/useDeleteTodo'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectTodoItems,
	selectTodoLoading,
	selectTodoError
} from './selectors'
import { fetchTodos } from './todoThunk'

export default function App() {
	const [refreshTodos, setRefreshTodos] = useState(false)
	const dispatch = useDispatch()
	const todos = useSelector(selectTodoItems)
	const loading = useSelector(selectTodoLoading)
	const error = useSelector(selectTodoError)
	const navigate = useNavigate(null)

	useEffect(() => {
		dispatch(fetchTodos())
	}, [dispatch])
	console.log(loading)

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
	if (error)
		return (
			<Navigate
				to="/404"
				replace
			/>
		)

	const value = {
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
