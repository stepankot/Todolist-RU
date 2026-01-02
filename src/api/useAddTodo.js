import { ref, push } from 'firebase/database'
import { database } from '../../firebase'

export default function createdTodo(todo, setLoading) {
	const todosRef = ref(database, 'todos/')
	setLoading(true)

	push(todosRef, todo)
		.then(response => console.log('Задача добавлена.'))
		.finally(() => setLoading(false))
}
