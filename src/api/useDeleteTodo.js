export default function DeleteTodo(id) {
	fetch(`http://localhost:3000/todos/${id}`, {
		method: 'DELETE'
	}).then(response => {
		response.json()
	})
}
