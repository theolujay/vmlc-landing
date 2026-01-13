import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// This file is the entry point of the React application.
// It is analogous to 'func main()' in Go or the 'if __name__ == "__main__":' block in Python scripts.
// It bridges the gap between the static HTML file (index.html) and the dynamic React code.

// 1. Find the actual HTML element in 'index.html' where the app will live.
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

// 2. Create a React root and "render" (draw) our main <App /> component into it.
const root = ReactDOM.createRoot(rootElement);
root.render(
  // React.StrictMode checks for potential problems in the app during development.
  // It's a development-only tool and doesn't affect the production build.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
