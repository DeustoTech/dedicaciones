import { FC } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

interface LoginButtonProps {
	onClick: () => void
}

const LoginButton: FC<LoginButtonProps> = (props) => {
	return (
		<Stack spacing={2} direction='row'>
			<Button
				onClick={props.onClick}
				variant='outlined'>
				Iniciar sesión
			</Button>
		</Stack>
	)
}

export default LoginButton
