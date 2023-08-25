import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/global.scss'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {BrowserRouter} from "react-router-dom"

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App/>
                <ReactQueryDevtools initialIsOpen/>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);
