import { useEffect, useState } from 'react'

export default function useGetTodos() {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [todos, setTodos] = useState(null)
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then(response => response.json())
			.then(data => setTodos(data))
			.catch(e => setError(e.message))
			.finally(() => setLoading(false))
	}, [])

	return { todos, error, loading }
}
