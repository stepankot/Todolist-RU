import { useState } from 'react'
import useTodos from './api/useTodos'
import TodoElement from './todoElement'

export default function App() {
	const { todos, error, loading } = useTodos()
	if (loading) return <p>Loading...</p>

	return (
		<div className="page">
			<h1>Список дел:</h1>
			<ul className="todos-container">
				{todos.map(todo => (
					<TodoElement
						key={todo.id}
						todo={todo}
					/>
				))}
			</ul>
		</div>
	)
}
