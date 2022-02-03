import { FC, useEffect, useState } from 'react'
import { DefaultParams, RouteComponentProps, useLocation } from 'wouter'
import StringAvatar from './StringAvatar'
import './Home.css'
import PanelButton from './PanelButton'
import { User } from '../../interfaces/User'
import { useAPI } from '../../hooks/useAPI'
import toast from 'react-hot-toast'

interface ParamsProps extends DefaultParams {
	token: string
}

const Home: FC<RouteComponentProps<ParamsProps>> = ({ params }) => {
	const [location, setLocation] = useLocation()
	const [user, setUser] = useState<User>()
	const { API /* setIsLoggedOut */ } = useAPI()

	async function getUser() {
		const resp = await API.getUser()
		if (resp.error) {
			throw new Error(resp.error) // el toast promise lo cachea
		} else if (resp.user) {
			setUser(resp.user)
		}
	}

	useEffect(() => {
		if (!params.token) throw new Error('no given token')

		localStorage.setItem('token', params.token) //TODO
		toast.promise(getUser(), {
			loading: 'Cargando...',
			success: <b>Listo!</b>,
			error: <b>Ha ocurrido un error inesperado.</b>,
		})
	}, [params])

	function introducirDedicacion() {}

	async function logout() {
		const resp = await API.logout()
		if (resp.error) {
			toast.error(resp.error)
		}

		localStorage.removeItem('token')
		setLocation('/')
		toast.success('Se ha cerrado sesión correctamente')
		// setIsLoggedOut(true)
	}
	if (!user) return <p>-</p>

	return (
		<>
			<header>
				<StringAvatar nombre={user?.nombre}></StringAvatar>
				<PanelButton onClick={logout} texto='Cerrar sesión'></PanelButton>
			</header>
			<div className='panel'>
				<PanelButton
					onClick={introducirDedicacion}
					texto='Introducir dedicación'></PanelButton>
				<PanelButton
					onClick={introducirDedicacion}
					texto='Consultar dedicación'></PanelButton>
				<PanelButton
					onClick={introducirDedicacion}
					texto='Consultar proyecto'></PanelButton>
				{user.isAdministrador && (
					<PanelButton onClick={logout} texto='Gestionar bd'></PanelButton>
				)}
			</div>
		</>
	)
}

export default Home
