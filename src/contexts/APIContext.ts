import * as React from 'react'
import { API } from '../api'

export interface APIContextValue {
	API?: API
}

const APIContext = React.createContext<APIContextValue>({})

export default APIContext
