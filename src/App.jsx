import { useState, useEffect } from 'react'
import useTodos from './api/useTodos'
import TodoElement from './todoElement'
import CreateModal from './CreateModal'
import createdTodo from './api/useAddTodo'
import deleteTodo from './api/useDeleteTodo'

export default function App() {
	const [refreshTodos, setRefreshTodos] = useState(false)
	const { todos, loading, setTodos, setLoading } = useTodos()
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

	if (loading) return <div class="loader"></div>

	const onSubmit = event => {
		event.preventDefault()
		createdTodo({ title: value, completed: false }, setLoading, setRefreshTodos)

		setRefreshTodos(!refreshTodos)
		setValue('')
		setOnModal(false)
	}

	const onDelete = id => {
		deleteTodo(id, setLoading)
	}

	const onSearch = e => {
		setSearchValue(e.target.value)
	}

	const filteredTodos =
		todos && Object.keys(todos).length > 0
			? Object.entries(todos)
					.filter(([id, todo]) =>
						todo.title.toLowerCase().includes(debouncedSearch.toLowerCase())
					)
					.sort(([, a], [, b]) => {
						if (!isSortAB) return 0
						return a.title.localeCompare(b.title)
					})
			: []

	return (
		<div className="page">
			<div>
				<h1 className="app-title">
					Список дел
					<div className="btn-cont">
						<button onClick={() => setOnModal(true)}>+</button>
					</div>
				</h1>
				{
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
				}
			</div>
			<div className="empty-todos">
				{!filteredTodos.length > 0 ? 'Ничего не найдено' : ''}
			</div>
			<ul className="todos-container">
				{filteredTodos.length > 0 &&
					filteredTodos.reverse().map(([id, todo]) => (
						<TodoElement
							key={id}
							id={id}
							todo={todo}
							onDelete={onDelete}
							setRefreshTodos={setRefreshTodos}
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
