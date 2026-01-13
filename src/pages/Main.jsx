import { useState, useEffect } from 'react'
import TodoElement from '../todoElement'
import CreateModal from '../CreateModal'

import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos } from '../todoThunk'
import {
	selectTodoError,
	selectTodoItems,
	selectTodoLoading
} from '../selectors'

export default function Main() {
	const todos = useSelector(selectTodoItems)
	const loading = useSelector(selectTodoLoading)
	const error = useSelector(selectTodoError)

	const [onModal, setOnModal] = useState(false)
	const [value, setValue] = useState('')
	const [isSortAB, setIsSortAB] = useState(false)

	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedSearch(searchValue)
		}, 400)

		return () => clearTimeout(timeout)
	}, [searchValue])

	const onSearch = e => {
		setSearchValue(e.target.value)
	}

	const onSubmit = e => {
		e.preventDefault()
		const todo = { title: value, completed: false }
		onCreate(todo)
		setValue('')
		setOnModal(false)
	}

	const filteredTodos = todos
		?.filter(todo =>
			todo.title.toLowerCase().includes(debouncedSearch.toLowerCase())
		)
		.sort((a, b) => {
			if (!isSortAB) return 0
			return a.title.localeCompare(b.title)
		})

	if (loading) return <div>Loading...</div>
	if (error) return <div>{error}</div>
	return (
		<div className="page">
			<div>
				<h1 className="app-title">
					Список дел
					<div className="btn-cont">
						<button onClick={() => setOnModal(true)}>+</button>
					</div>
				</h1>
				{todos && (
					<div className="filter-group">
						<label>
							Сортировать дела по алфавиту
							<input
								type="checkbox"
								className="todo-chkbox"
								onChange={() => setIsSortAB(!isSortAB)}
							/>
						</label>
						<input
							onChange={onSearch}
							value={searchValue}
							placeholder="Поиск"
							className="searching-input"
						/>
					</div>
				)}
			</div>
			<p>Нажмите на задачу, чтобы перейти на страницу задачи</p>
			<div className="empty-todos">
				{!todos.length
					? 'Список дел пуст нажмите "+"'
					: !filteredTodos.length
					? 'Ничего не найдено'
					: ''}
			</div>
			<ul className="todos-container">
				{todos &&
					filteredTodos.map(todo => (
						<TodoElement
							key={todo.id}
							todo={todo}
						/>
					))}
			</ul>
			{onModal ? (
				<CreateModal
					value={value}
					setValue={setValue}
					setOnModal={setOnModal}
					onSubmit={onSubmit}
					isNew={true}
				/>
			) : (
				''
			)}
		</div>
	)
}
