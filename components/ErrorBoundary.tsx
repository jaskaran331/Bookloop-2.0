import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  // FIX: Reverted to using a constructor for state initialization. The class property syntax can cause type inference issues with some build configurations, leading to the 'props' property not being recognized on the component instance.
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900 text-center p-4">
            <h1 className="text-2xl font-bold text-red-500 mb-2">Oops! Something went wrong.</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
                Refresh Page
            </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
