import { useState } from 'react'
import useTodos from './api/useTodos'
import TodoElement from './todoElement'
import CreateModal from './CreateModal'
import createdTodo from './api/useAddTodo'
import deleteTodo from './api/useDeleteTodo'

export default function App() {
	const [refreshTodos, setRefreshTodos] = useState(false)
	const { todos, error, loading, setTodos, setLoading } = useTodos(refreshTodos)
	const [onModal, setOnModal] = useState(false)
	const [value, setValue] = useState('')
	const [isSortAB, setIsSortAB] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	if (loading) return <p>Loading...</p>

	const onSubmit = event => {
		event.preventDefault()
		createdTodo({ title: value, completed: false }, setLoading, setRefreshTodos)

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
		deleteTodo(todo, setLoading)
	}

	const onSearch = e => {
		setSearchValue(e.target.value)
	}

	const filteredTodos = todos
		.filter(todo =>
			todo.title.toLowerCase().includes(searchValue.toLowerCase())
		)
		.sort((a, b) => {
			if (!isSortAB) return 0
			return a.title.localeCompare(b.title)
		})

	return (
		<div className="page">
			<div>
				<h1 className="app-title">Список дел</h1>
				{todos[0] && (
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
				<div className="btn-cont">
					<button onClick={() => setOnModal(true)}>Создать</button>
				</div>
			</div>
			<div className="empty-todos">
				{!todos[0]
					? 'Список дел пуст нажмите Создать'
					: !filteredTodos[0]
					? 'Ничего не найдено'
					: ''}
			</div>
			<ul className="todos-container">
				{todos[0] &&
					filteredTodos.map(todo => (
						<TodoElement
							key={todo.id}
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
