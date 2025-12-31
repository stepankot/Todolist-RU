export default function TodoElement({ todo }) {
	return (
		<li className={todo.completed ? 'completed' : ''}>
			<div className="todo-row">
				<span>{todo.title}</span>
			</div>
			<div className="todo-actions">
				<span className="status">
					{todo.completed ? 'Выполнен' : 'Невыполнен'}
				</span>

				<input
					type="checkbox"
					className="todo-chkbox"
					checked={todo.completed}
				/>
			</div>
		</li>
	)
}
