import axios, { AxiosResponse, AxiosError } from 'axios'
import { User } from '../interfaces/User'

interface GeneralAPIResponse<T = unknown> {
	error?: {
		message: string
	}
	data?: T
}

interface GetUser {
	user: User
}
interface Login {
	authUrl: string
}

export class API {
	httpClient

	constructor(baseURL: string) {
		this.httpClient = axios.create({
			baseURL: baseURL,
		})

		this.httpClient.interceptors.request.use((request) => {
			if (!request.headers) request.headers = {}
			request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
			return request
		})
	}
	static isNetworkError(err: AxiosError) {
		const isNetworkError = !!err.isAxiosError && !err.response
		return isNetworkError
	}
	async login(): Promise<{ error?: string; authUrl?: string }> {
		try {
			const response = await this.httpClient.get<
				{},
				AxiosResponse<GeneralAPIResponse<Login>>
			>('/auth/login/open-id/google')

			if (response.data.error) {
				return { error: response.data.error.message }
			}

			if (response.data.data) {
				return { authUrl: response.data.data.authUrl }
			}

			return { error: 'Unknown error' }
		} catch (error) {
			if (!(error instanceof Error)) return { error: 'Unknown error' }

			const axiosError = error as AxiosError
			if (axiosError.isAxiosError) {
				return { error: axiosError.response?.data.message }
			}

			return { error: error.message }
		}
	}

	async logout(): Promise<{ error?: string }> {
		const response = await this.httpClient.delete<
			{},
			AxiosResponse<GeneralAPIResponse>
		>('/authorized/logout')
		if (response.data.error) {
			return { error: response.data.error.message }
		}
		return {}
	}
	async getUser(): Promise<{ error?: string; user?: User }> {
		try {
			const response = await this.httpClient.get<
				{},
				AxiosResponse<GeneralAPIResponse<GetUser>>
			>('/authorized/profile')

			if (response.data.error) {
				return { error: response.data.error.message }
			}

			if (response.data.data) {
				return { user: response.data.data.user }
			}

			return { error: 'Unknown error' }
		} catch (error) {
			if (!(error instanceof Error)) return { error: 'Unknown error' }

			const axiosError = error as AxiosError
			if (axiosError.isAxiosError) {
				return { error: axiosError.response?.data.message }
			}

			return { error: error.message }
		}
	}
	onUnauthorized(cb: () => void | Promise<void>) {
		this.httpClient.interceptors.response.use(
			(response) => {
				if (response.status === 410) {
					cb()
				}
				return response
			},
			(error) => {
				if (error.response.status === 410) {
					cb()
				}
			}
		)
	}
}
