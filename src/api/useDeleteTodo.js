export default function deleteTodo(todo, setLoading) {
	setLoading(true)
	fetch(`http://localhost:3000/todos/${todo.id}`, {
		method: 'DELETE'
	})
		.then(response => {
			response.json()
		})
		.finally(() => setLoading(false))
}
