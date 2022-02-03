import { FC } from 'react'
import Button from '@mui/material/Button'

interface PanelButtonProps {
	onClick: () => void
	texto: string
	className?: string
}

const PanelButton: FC<PanelButtonProps> = (props) => {
	return (
		<Button
			className={props.className}
			onClick={props.onClick}
			variant='outlined'>
			{props.texto}
		</Button>
	)
}

export default PanelButton
