import { Navigate, replace, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import CreateModal from '../CreateModal'
import BackBtn from '../BackBtn'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectSelectedTodo,
	selectCurrentTodoLoading,
	selectFetchedStatus
} from '../selectors'
import { deleteTodo, fetchCurrentTodo, updateTodo } from '../todoThunk'
import { updateTodoGlobalState } from '../todoActions'

export default function Task() {
	const { id } = useParams()
	const [onModal, setOnModal] = useState(false)
	const [title, setTitle] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate(null)
	const todo = useSelector(selectSelectedTodo)
	const isFetched = useSelector(selectFetchedStatus)

	useEffect(() => {
		dispatch(fetchCurrentTodo(id))
	}, [dispatch])

	useEffect(() => {
		if (todo?.title) {
			setTitle(todo.title)
		}
	}, [todo])

	const onSubmit = () => {
		const updTodo = { ...todo, title: title }
		dispatch(updateTodo(updTodo))
		dispatch(updateTodoGlobalState(updTodo))
		setOnModal(false)
	}

	const onStatusChange = () => {
		const changedStatusTodo = { ...todo, completed: !todo.completed }
		dispatch(updateTodo(changedStatusTodo))
		dispatch(updateTodoGlobalState(changedStatusTodo))
	}

	const onDelete = () => {
		navigate('/', { replace: true })
		dispatch(deleteTodo(id))
	}

	if (isFetched && !todo.title) {
		return (
			<div className="tsk-nt-fund">
				<section className="errpage">
					<BackBtn />
					<h2 className="tsk-nt-fund-txt">Задача не найдена</h2>
				</section>
			</div>
		)
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
					onSubmit={onSubmit}
					initialValue={todo?.title}
					isNew={false}
				/>
			)}
		</div>
	)
}
