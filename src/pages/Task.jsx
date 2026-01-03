import { Navigate, useParams } from 'react-router'
import useGetTodo from '../api/useGetTask'
import { updateTodo } from '../api/useUpdateTodo'
import deleteTodo from '../api/useDeleteTodo'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import CreateModal from '../CreateModal'
import BackBtn from '../BackBtn'

export default function Task() {
	const { id } = useParams()
	const [refreshTodo, setRefreshTodos] = useState(false)
	const [delLoading, setDelLoading] = useState(false)
	const [onModal, setOnModal] = useState(false)
	const [title, setTitle] = useState('')

	const navigate = useNavigate(null)

	const { todo, loading, error } = useGetTodo(id, refreshTodo)
	useEffect(() => {
		if (todo?.title) {
			setTitle(todo.title)
		}
	}, [loading, todo])

	if (loading) return <p>Loading...</p>
	if (error)
		return (
			<Navigate
				to="/404"
				replace
			/>
		)

	function onStatusChange() {
		const updatedTodo = {
			...todo,
			completed: !todo.completed
		}
		updateTodo(updatedTodo, setRefreshTodos)
	}
	function onUpdate() {
		const updatedTodo = {
			...todo,
			title: title
		}
		updateTodo(updatedTodo, setRefreshTodos)
		setOnModal(false)
	}

	const onDelete = () => {
		deleteTodo(todo, setDelLoading)
		navigate(-1)
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
					<button onClick={onDelete}>Удалить</button>
					<button onClick={onStatusChange}>
						{todo.completed ? 'Отменить' : 'Выполнить'}
					</button>
				</div>
			</div>
			{onModal && (
				<CreateModal
					value={title}
					setValue={setTitle}
					setOnModal={setOnModal}
					onSubmit={onUpdate}
					initialValue={todo?.title}
					isNew={false}
				/>
			)}
		</div>
	)
}
