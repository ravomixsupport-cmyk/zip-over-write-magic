import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary]", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const isNativeError =
        this.state.error?.message?.includes("plugin") ||
        this.state.error?.message?.includes("Capacitor") ||
        this.state.error?.message?.includes("not available") ||
        this.state.error?.message?.includes("not implemented");

      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">
            {isNativeError ? "Action Not Supported" : "Something went wrong. Please refresh."}
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">
            {isNativeError
              ? this.props.fallbackMessage || "This feature is not supported on your device. Please try on a newer device or update the app."
              : "कुछ गलत हुआ। कृपया रीफ्रेश करें।"}
          </p>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition active:scale-95"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
