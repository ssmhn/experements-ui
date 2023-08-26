import {Outlet, Route, Router, RouterContext} from "@tanstack/react-router";
import {Layout} from "../components/global/Layout/Layout";
import {Login} from "../components/ui/Login/Login";
import {Register} from "../components/ui/Register/Register";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import React from "react";
import {QueryClient} from "@tanstack/react-query";

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
    component: () => (
        <div>
            <Outlet />
        </div>
    )
})

const loginRoute = new Route({
    getParentRoute: () => authRoute,
    path: '/login',
    component: Login
})

const registerRoute = new Route({
    getParentRoute: () => authRoute,
    path: '/register',
    component: Register
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    authRoute.addChildren([
        loginRoute,
        registerRoute
    ])
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