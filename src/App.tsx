import {RouterProvider} from "@tanstack/react-router";
import {router} from "./routing/router";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import React from "react";

export const App = () => {
    return (
        <>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
        </>
    )
}