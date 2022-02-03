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
	// const [isLoggedOut, setIsLoggedOut] = useState(false)
	const [location, setLocation] = useLocation()
	const api = new API('http://localhost:3001/')

	api.onUnauthorized(() => {
		setLocation('/')
		toast.error('Su sesión ha expirado')
	})
	return (
		<ErrorBoundary>
			<Toaster />
			<APIContext.Provider
				value={{ /*isLoggedOut, setIsLoggedOut,*/ API: api }}>
				<Route component={Init} path='/' />
				<Route component={Home} path='/home/:token' />
			</APIContext.Provider>
		</ErrorBoundary>
	)
}

export default App
