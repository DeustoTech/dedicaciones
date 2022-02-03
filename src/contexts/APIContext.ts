import * as React from 'react'
import { API } from '../api'

export interface APIContextValue {
	// isLoggedOut?: boolean
	// setIsLoggedOut?: React.Dispatch<React.SetStateAction<boolean>> // es lo mismo que (param: boolean) => void;
	API?: API
}

const APIContext = React.createContext<APIContextValue>({})

export default APIContext
