import { Navigate, useParams } from 'react-router'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import CreateModal from '../CreateModal'
import BackBtn from '../BackBtn'
import { TaskContext } from '../context'

export default function Task() {
	const { id } = useParams()
	const [onModal, setOnModal] = useState(false)
	const [title, setTitle] = useState('')
	const { getTodo, onStatusChange, onUpdate, deleteTodo } =
		useContext(TaskContext)

	const todo = getTodo(id)
	const navigate = useNavigate(null)

	useEffect(() => {
		if (todo?.title) {
			setTitle(todo.title)
		}
	}, [todo])

	const onSubmit = () => {
		const updTodo = { ...todo, title: title }
		onUpdate(updTodo)

		setOnModal(false)
	}

	return (
		<div className="page">
			<BackBtn />
			<div className="task-card">
				<div className={`task-status ${todo.completed ? 'done' : 'open'}`}>
					{todo.completed ? 'Выполнена' : 'Невыполнена'}
				</div>

				<div className="task-title">{todo.title}</div>

				<div className="task-actions">
					<button onClick={() => setOnModal(true)}>Изменить</button>
					<button onClick={() => deleteTodo(todo.id)}>Удалить</button>
					<button onClick={() => onStatusChange(todo)}>
						{todo.completed ? 'Отменить' : 'Выполнить'}
					</button>
				</div>
			</div>
			{onModal && (
				<CreateModal
					value={title}
					setValue={setTitle}
					setOnModal={setOnModal}
					onSubmit={onSubmit}
					initialValue={todo?.title}
					isNew={false}
				/>
			)}
		</div>
	)
}
