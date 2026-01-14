import { Navigate, Outlet, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTodoLoading, selectTodoError } from './selectors'
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

	return (
		<div>
			<Outlet />
		</div>
	)
}
