import { ref, set } from 'firebase/database'
import { database } from '../../firebase'

export const updateTodo = (id, updatedTodo, setChangedLoading) => {
	setChangedLoading(true)
	console.log(updatedTodo)
	const todosRef = ref(database, `todos/${id}`)

	set(todosRef, updatedTodo)
		.then(response => console.log('Задача обновлена.'))
		.finally(() => setChangedLoading(false))
}
