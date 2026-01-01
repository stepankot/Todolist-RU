import { useState } from 'react'
import useTodos from './api/useTodos'
import TodoElement from './todoElement'
import CreateModal from './CreateModal'
import createdTodo from './api/useAddTodo'
import deleteTodo from './api/useDeleteTodo'

export default function App() {
	const [refreshTodos, setRefreshTodos] = useState(false)
	const { todos, error, loading, setTodos } = useTodos(refreshTodos)
	const [onModal, setOnModal] = useState(false)
	const [value, setValue] = useState('')
	if (loading) return <p>Loading...</p>

	const onSubmit = event => {
		event.preventDefault()
		createdTodo({ title: value, completed: false })

		setRefreshTodos(!refreshTodos)
		setValue('')
		const mockTodo = {
			id: todos.length + 1,
			title: value,
			completed: false
		}
		setTodos([...todos, mockTodo])
		setOnModal(false)
	}

	const onDelete = todo => {
		const newTodos = todos.filter(item => item.id !== todo.id)
		setTodos(newTodos)
		deleteTodo(todo)
	}

	return (
		<div className="page">
			<div>
				<h1>Список дел:</h1>
				<div className="btn-cont">
					<button onClick={() => setOnModal(true)}>Создать</button>
				</div>
			</div>
			<div className="empty-todos">
				{!todos[0] ? 'Список дел пуст нажмите Создать' : ''}
			</div>
			<ul className="todos-container">
				{todos[0] &&
					todos.map(todo => (
						<TodoElement
							key={todo.id}
							todo={todo}
							onDelete={onDelete}
						/>
					))}
			</ul>
			{onModal ? (
				<CreateModal
					value={value}
					setValue={setValue}
					setOnModal={setOnModal}
					onSubmit={onSubmit}
				/>
			) : (
				''
			)}
		</div>
	)
}
