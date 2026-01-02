import { useState } from 'react'
import { updateTodo } from './api/useUpdateTodo'
import CreateModal from './CreateModal'
export default function TodoElement({ todo, onDelete, setRefreshTodos }) {
	const [isChecked, setIsChecked] = useState(todo.completed)
	const [changedLoading, setChangedLoading] = useState()
	const [onModal, setOnModal] = useState(false)
	const [title, setTitle] = useState(todo.title)

	if (changedLoading) return <p>Изменение...</p>
	function onStatusChange() {
		const updatedTodo = {
			...todo,
			completed: !todo.completed
		}
		setIsChecked(!isChecked)
		updateTodo(updatedTodo, setChangedLoading, setRefreshTodos)
	}
	function onUpdate() {
		const updatedTodo = {
			...todo,
			title: title
		}
		updateTodo(updatedTodo, setChangedLoading, setRefreshTodos)
		setOnModal(false)
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
				<button onClick={() => setOnModal(!onModal)}>Изменить</button>
			</div>
			{onModal && (
				<CreateModal
					value={title}
					setValue={setTitle}
					setOnModal={setOnModal}
					onSubmit={onUpdate}
					isNew={false}
					initialValue={todo.title}
				/>
			)}
		</li>
	)
}
