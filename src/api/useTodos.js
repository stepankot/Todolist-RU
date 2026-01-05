import { useEffect, useState } from 'react'

export default function useGetTodos(refreshTodos) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [todos, setTodos] = useState([])
	useEffect(() => {
		fetch('http://localhost:3000/todos')
			.then(response => response.json())
			.then(data => setTodos(data.reverse()))
			.catch(e => setError(e.message))
			.finally(() => setLoading(false))
	}, [refreshTodos])

	return { todos, error, loading }
}
