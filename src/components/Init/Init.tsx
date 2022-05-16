import { FC } from 'react'
import LoginButton from './LoginButton'
import './Init.css'
import logo from './logo.jpg'
import { useAPI } from '../../hooks/useAPI'

const Init: FC = () => {
	const { API } = useAPI()

	const onLogin = async () => {
		const resp = await API.login()
		let url = ''
		if (resp.error) {
			throw new Error(resp.error)
		} else if (resp.authUrl) {
			url = resp.authUrl
		}
		window.location.href = url
	}
	return (
		<div className='init'>
			<LoginButton onClick={onLogin}></LoginButton>
			<img src={logo} alt=''></img>
		</div>
	)
}

export default Init
