import { FC } from 'react'
import Button from '@mui/material/Button'

interface LoginButtonProps {
	onClick: () => void
}

const LoginButton: FC<LoginButtonProps> = (props) => {
	return (
		<Button onClick={props.onClick} variant='outlined'>
			Iniciar sesión
		</Button>
	)
}

export default LoginButton
