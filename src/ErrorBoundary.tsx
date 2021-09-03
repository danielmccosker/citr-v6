import { Component, ErrorInfo, ReactNode } from "react";
import { Link, Redirect } from "react-router-dom";

interface IStateType {
  hasError: boolean;
  redirect: boolean;
}

class ErrorBoundary extends Component {
  state: IStateType = { hasError: false, redirect: false };

  static getDerivedStateFromError(): IStateType {
    return { hasError: true, redirect: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log to Sentry, Azure Monitor, NewRelic, Cloud Watch
    console.error("ErrorBoundary caught an error", { error, errorInfo });

    setTimeout(() => this.setState({ redirect: true }), 5000);
  }

  render(): ReactNode {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          This listing has an error.
          <Link to="/">Go back to the home page</Link>, or wait to be
          redirected.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
