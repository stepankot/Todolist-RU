export default function deleteTodo(todo) {
	fetch(`http://localhost:3000/todos/${todo.id}`, {
		method: 'DELETE'
	})
		.then(response => {
			response.json()
		})
		.finally(() => setIsDeleting(false))
}
