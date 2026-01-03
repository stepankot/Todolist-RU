import { useNavigate } from 'react-router'

export default function BackBtn() {
	const navigate = useNavigate(null)

	return (
		<button
			className="bckBtn"
			onClick={() => navigate(-1)}
		>
			Назад
		</button>
	)
}
