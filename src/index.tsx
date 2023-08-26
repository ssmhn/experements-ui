import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/global.scss'
import {queryClient} from "./routing/router";
import {QueryClientProvider} from "@tanstack/react-query";
import {App} from "./App";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </>
);
