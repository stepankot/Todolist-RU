export const updateTodo = updatedTodo => {
	fetch(`http://localhost:3000/todos/${updatedTodo.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(updatedTodo)
	}).then(response => response.json)
}
