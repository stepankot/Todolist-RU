import { useNavigate } from 'react-router'

export default function NotFound() {
	const navigate = useNavigate(null)

	return (
		<div className="page">
			<button
				className="bckBtn"
				onClick={() => navigate('/', { replace: true })}
			>
				На главную
			</button>
			<img
				src="404.jpg"
				alt=""
			/>
		</div>
	)
}
