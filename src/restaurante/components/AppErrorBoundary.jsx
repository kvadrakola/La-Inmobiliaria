import { Component } from 'react';
import { UI } from '../constants/app';

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled UI error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-container">
          <div className="card p-6 text-center">
            <h1 className="section-title" style={{ fontSize: '20px' }}>
              Algo salió mal
            </h1>
            <p className="section-subtitle mt-2">
              {this.state.error?.message || 'Error inesperado en la aplicación.'}
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="btn btn-primary mt-4 px-4 py-2"
            >
              {UI.retryLabel}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
