import { createBrowserRouter, Navigate } from 'react-router'

import Task from './pages/Task'
import Main from './pages/Main'
import App from './App'

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Main />
			},
			{
				path: 'todo/:id',
				element: <Task />
			},
			{
				path: '404',
				element: <div>Not found</div>
			},
			{
				path: '*',
				element: <Navigate to="/404" />
			}
		]
	}
])
