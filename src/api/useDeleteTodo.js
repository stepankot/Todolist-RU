export default function deleteTodo(todo, setDelLoading) {
	setDelLoading(true)
	fetch(`http://localhost:3000/todos/${todo.id}`, {
		method: 'DELETE'
	})
		.then(response => {
			response.json()
		})
		.finally(() => setDelLoading(false))
}
