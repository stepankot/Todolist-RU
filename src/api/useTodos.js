import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { database } from '../../firebase'

export default function useGetTodos(refreshTodos) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [todos, setTodos] = useState(null)
	useEffect(() => {
		const todosRef = ref(database, 'todos')

		onValue(todosRef, snapshot => {
			const loadedtodos = snapshot.val()
			setTodos(loadedtodos)
			setLoading(false)
		})
	}, [])

	return { todos, error, loading, setTodos, setLoading }
}
