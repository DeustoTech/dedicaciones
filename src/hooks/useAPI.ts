import { useContext } from 'react'
import APIContext, { APIContextValue } from '../contexts/APIContext'

export function useAPI(): Required<APIContextValue> {
	const { API /* isLoggedOut, setIsLoggedOut */ } = useContext(APIContext)
	if (
		typeof API === 'undefined'
		// || typeof isLoggedOut === 'undefined' ||
		// typeof setIsLoggedOut === 'undefined'
	) {
		throw new Error('Failed to initialize')
	}

	return { API /*isLoggedOut, setIsLoggedOut*/ }
}
