import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('HarvestRoute Uncaught Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
          <div className="glass-floating max-w-md w-full p-8 rounded-3xl border border-white/20 text-center shadow-2xl backdrop-blur-xl">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold font-display text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-xs text-white/70 font-sans mb-6">
              A temporary interface issue occurred. Click reload to refresh HarvestRoute.
            </p>
            {this.state.error && (
              <pre className="text-[11px] font-mono text-rose-300/80 bg-black/40 p-3 rounded-xl mb-6 text-left overflow-x-auto max-h-32">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={this.handleReload}
              className="btn-primary w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload HarvestRoute</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

