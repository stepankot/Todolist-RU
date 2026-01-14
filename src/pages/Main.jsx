import { useEffect } from 'react'
import TodoElement from '../todoElement'
import CreateModal from '../CreateModal'

import { useDispatch, useSelector } from 'react-redux'
import {
	selectDebouncedSearch,
	selectIsSortAB,
	selectOnModal,
	selectSerchValue,
	selectTodoError,
	selectTodoItems,
	selectTodoLoading,
	selectValue
} from '../selectors'
import { addTodo } from '../todoThunk'
import {
	setDebouncedSearch,
	setModalState,
	setSearchValue,
	setSort,
	setValue
} from '../todoActions'

export default function Main() {
	const todos = useSelector(selectTodoItems)
	const loading = useSelector(selectTodoLoading)
	const error = useSelector(selectTodoError)

	const onModal = useSelector(selectOnModal)
	const value = useSelector(selectValue)
	const isSortAB = useSelector(selectIsSortAB)
	const searchValue = useSelector(selectSerchValue)
	const debouncedSearch = useSelector(selectDebouncedSearch)

	const dispatch = useDispatch()

	useEffect(() => {
		const timeout = setTimeout(() => {
			dispatch(setDebouncedSearch(searchValue))
		}, 400)

		return () => clearTimeout(timeout)
	}, [searchValue])

	const onSearch = e => {
		dispatch(setSearchValue(e.target.value))
	}

	const setInputValue = value => {
		dispatch(setValue(value))
	}

	const onSubmit = e => {
		e.preventDefault()
		const todo = { title: value, completed: false }
		dispatch(addTodo(todo))
		dispatch(setValue(''))
		dispatch(setModalState())
	}

	const setOnModal = () => {
		dispatch(setModalState())
	}

	if (loading) return <div>Loading...</div>
	if (error) return <div>{error}</div>

	const filteredTodos = todos
		?.filter(todo =>
			todo.title.toLowerCase().includes(debouncedSearch.toLowerCase())
		)
		.sort((a, b) => {
			if (!isSortAB) return 0
			return a.title.localeCompare(b.title)
		})

	return (
		<div className="page">
			<div>
				<h1 className="app-title">
					Список дел
					<div className="btn-cont">
						<button onClick={setOnModal}>+</button>
					</div>
				</h1>
				{todos && (
					<div className="filter-group">
						<label>
							Сортировать дела по алфавиту
							<input
								type="checkbox"
								className="todo-chkbox"
								onChange={() => dispatch(setSort())}
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
					setValue={setInputValue}
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
