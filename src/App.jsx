import { Navigate, Outlet, useNavigate, useParams } from 'react-router'
import { TaskContext } from './context'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectTodoItems,
	selectTodoLoading,
	selectTodoError
} from './selectors'
import { fetchTodos } from './todoThunk'

export default function App() {
	const dispatch = useDispatch()

	const loading = useSelector(selectTodoLoading)
	const error = useSelector(selectTodoError)
	const navigate = useNavigate(null)

	useEffect(() => {
		dispatch(fetchTodos())
	}, [dispatch])

	if (loading) return <div>Loading</div>
	if (error)
		return (
			<Navigate
				to="/404"
				replace
			/>
		)

	const value = null
	return (
		<TaskContext value={value}>
			<div>
				<Outlet />
			</div>
		</TaskContext>
	)
}
