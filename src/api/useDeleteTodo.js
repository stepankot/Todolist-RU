import { ref, remove } from 'firebase/database'
import { database } from '../../firebase'

export default function deleteTodo(id, setLoading) {
	setLoading(true)
	const todosRef = ref(database, `todos/${id}`)

	remove(todosRef)
		.then(response => console.log('Задача удалена.'))
		.finally(() => setLoading(false))
}
