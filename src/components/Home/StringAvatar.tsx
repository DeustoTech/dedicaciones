import { FC } from 'react'
import Avatar from '@mui/material/Avatar'

interface StringAvatarProps {
	nombre: string
}

function stringToColor(string: string) {
	let hash = 0
	let i

	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash)
	}

	let color = '#'

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff
		color += `00${value.toString(16)}`.substr(-2)
	}

	return color
}

function stringAvatar(name: string) {
	if (!name) return
	let iniciales = ''
	if (name.split(' ')[1] === undefined) iniciales = name.split(' ')[0][0]
	else iniciales = name.split(' ')[0][0] + name.split(' ')[1][0]
	return {
		sx: {
			bgcolor: stringToColor(name),
		},

		children: `${iniciales}`,
	}
}

const StringAvatar: FC<StringAvatarProps> = (props) => {
	return (
		<>
			<Avatar {...stringAvatar(props.nombre)} />
		</>
	)
}

export default StringAvatar
