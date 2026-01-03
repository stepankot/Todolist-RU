import { useNavigate } from 'react-router'
export default function TodoElement({ todo }) {
	const navigate = useNavigate(null)

	const handleNavigate = () => {
		navigate(`todo/${todo.id}`)
	}

	return (
		<li
			className={todo.completed ? 'completed' : ''}
			onClick={handleNavigate}
		>
			<div className="todo-row">
				<span>{todo.title}</span>
			</div>
			<div className="todo-actions">
				<span className="status">
					{todo.completed ? 'Выполнен' : 'Невыполнен'}
				</span>
			</div>
		</li>
	)
}
