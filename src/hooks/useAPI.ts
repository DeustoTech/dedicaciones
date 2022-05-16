import { useContext } from 'react'
import APIContext, { APIContextValue } from '../contexts/APIContext'

export function useAPI(): Required<APIContextValue> {
	const { API } = useContext(APIContext)
	if (typeof API === 'undefined') {
		throw new Error('Failed to initialize')
	}

	return { API }
}
