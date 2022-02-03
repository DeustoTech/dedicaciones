import { Component, createElement } from 'react'

interface ErrorBoundaryState {
	hasError: boolean
	error?: Error
}

interface ErrorBoundaryProps {}
export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props = {}) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo = {}) {
		this.setState({
			error: error,
			hasError: true,
		})
	}

	render() {
		if (this.state.hasError && this.state.error) {
			const { message, stack } = this.state.error
			const isDev = '_self' in createElement('div')

			return (
				<>
					<h1>Something went wrong.</h1>
					{isDev && (
						<>
							<p>Error: </p>
							<pre>{message}</pre>
							<p>Stack: </p>
							<pre>{stack}</pre>
						</>
					)}
				</>
			)
		}

		return this.props.children
	}
}
