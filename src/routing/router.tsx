import {Outlet, Route, Router, RouterContext} from "@tanstack/react-router";
import {Layout} from "../components/global/Layout/Layout";
import {Login} from "../components/pages/Login/Login";
import {Register} from "../components/pages/Register/Register";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import React from "react";
import {QueryClient} from "@tanstack/react-query";
import {Form} from "../components/global/Form/Form";
import {Experiment} from "../components/pages/Experiment/Experiment";

export const queryClient = new QueryClient()

const routerContext = new RouterContext<{
    queryClient: typeof queryClient
}>()

const rootRoute = routerContext.createRootRoute({
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools router={router} position={'bottom-right'} />
        </>
    )
})

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Layout
})

const authRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: Form
})

const loginRoute = new Route({
    getParentRoute: () => authRoute,
    path: '/login',
    component: () => <Login />,
})

const registerRoute = new Route({
    getParentRoute: () => authRoute,
    path: '/register',
    component: () => <Register />
})

//
const experimentRoute = new Route({
    getParentRoute: () => indexRoute,
    path: '/experiment',
    component: () => <Experiment/>
})
//

const routeTree = rootRoute.addChildren([
    indexRoute,
    authRoute.addChildren([
        loginRoute,
        registerRoute
    ]),
    experimentRoute
])

export const router = new Router({
    routeTree,
    defaultPreload: 'intent',
    context: {
        queryClient,
    }
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}