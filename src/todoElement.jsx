import { useState } from 'react'
import { updateTodo } from './api/useUpdateTodo'
export default function TodoElement({ todo, onDelete }) {
	const [isChecked, setIsChecked] = useState(todo.completed)
	const [changedLoading, setChangedLoading] = useState()

	function onStatusChange() {
		const updatedTodo = {
			...todo,
			completed: !todo.completed
		}
		setIsChecked(!isChecked)
		updateTodo(updatedTodo, setChangedLoading)
	}

	return (
		<li className={isChecked ? 'completed' : ''}>
			<div className="todo-row">
				<span>{todo.title}</span>
			</div>
			<div className="todo-actions">
				<span className="status">{isChecked ? 'Выполнен' : 'Невыполнен'}</span>

				<input
					type="checkbox"
					className="todo-chkbox"
					checked={isChecked}
					onChange={onStatusChange}
				/>
				<button onClick={() => onDelete(todo)}>Удалить</button>
				<button>Изменить</button>
			</div>
		</li>
	)
}
