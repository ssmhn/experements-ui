import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/global.scss'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />

            <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
    </React.StrictMode>
);
