import { createBrowserRouter, Navigate } from 'react-router'

import Task from './pages/Task'
import Main from './pages/Main'
import App from './App'
import NotFound from './pages/404'

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
				element: <NotFound />
			},
			{
				path: '*',
				element: <Navigate to="/404" />
			}
		]
	}
])
