import React from 'react'
import './App.css'
import { Route, useLocation } from 'wouter'
import Init from './components/Init/Init'
import Home from './components/Home/Home'
import { ErrorBoundary } from './components/ErrorBoundary'
import APIContext from './contexts/APIContext'
import { API } from './api'
import toast, { Toaster } from 'react-hot-toast'

function App() {
	const [location, setLocation] = useLocation()
	const api = new API('http://localhost:3001/')

	api.onUnauthorized(() => {
		setLocation('/')
		toast.error('Su sesión ha expirado')
	})
	return (
		<ErrorBoundary>
			<div>
				<Toaster />
				<APIContext.Provider value={{ API: api }}>
					<Route component={Init} path='/' />
					<Route component={Home} path='/home/:token' />
				</APIContext.Provider>
			</div>
		</ErrorBoundary>
	)
}

export default App
