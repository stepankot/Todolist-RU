export default function CreateModal({
	value,
	setValue,
	setOnModal,
	onSubmit,
	initialValue,
	isNew
}) {
	console.log(value)
	return (
		<div className="modal-overlay">
			<div className="modal-wrapper">
				<form>
					<input
						type="text"
						placeholder="Название"
						value={value}
						onChange={({ target }) => setValue(target.value)}
					/>
				</form>
				<section className="modal-btns-sec">
					<button
						className="create-btn"
						onClick={onSubmit}
						disabled={!value || initialValue === value}
						style={
							value && initialValue === value
								? { background: 'gray' }
								: value
								? { background: 'black' }
								: {}
						}
					>
						{isNew ? 'Создать' : 'Сохранить'}
					</button>
					<button
						className="close"
						onClick={() => setOnModal(false)}
					>
						Закрыть
					</button>
				</section>
			</div>
		</div>
	)
}
