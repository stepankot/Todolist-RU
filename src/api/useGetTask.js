import { useEffect, useState } from 'react'

export default function useGetTodo(id, refreshTodo) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [todo, setTodo] = useState(null)

	useEffect(() => {
		fetch(`http://localhost:3000/todos/${id}`)
			.then(response => response.json())
			.then(data => setTodo(data))
			.catch(e => setError(e.message))
			.finally(() => setLoading(false))
	}, [refreshTodo])
	return { loading, error, todo }
}
