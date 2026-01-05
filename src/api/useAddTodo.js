export default function createdTodo(todo) {
	fetch('http://localhost:3000/todos', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(todo)
	}).then(response => {
		response.json()
	})
}
