import React from 'react'
import './App.css'
import { Route } from 'wouter'
import Init from './components/Init/Init'
import Home from './components/Home'
function App() {
	return (
		<>
			<Route component={Init} path='/' />
			<Route component={Home} path='/home' />
		</>
	)
}

export default App
