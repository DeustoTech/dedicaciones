import { FC } from 'react'
import LoginButton from './LoginButton'
import './Init.css'
import logo from '../../logo.jpg'

async function login() {
	const search = await fetch(
		'http://localhost:3001/auth/login/open-id/google',
		{
			method: 'GET',
		}
	)
	window.location.replace((await search.json()).authorizationUrl)
	return search
}

const Init: FC = () => {
	return (
		<div className='init'>
			<LoginButton onClick={login}></LoginButton>
			<img src={logo} alt=''></img>
		</div>
	)
}

export default Init
