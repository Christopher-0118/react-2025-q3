import { Component, type ErrorInfo } from 'react';
import type { IErrorBoundaryProps, IErrorBoundaryState } from '../type';

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h3 style={{ color: 'red' }}>Something went wrong.</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
