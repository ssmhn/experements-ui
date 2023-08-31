import {FC, PropsWithChildren} from "react"
import classes from './Layout.module.scss'
import {Aside} from "../../ui/Aside/Aside";
import {Header} from "../../ui/Header/Header";
import {Filters} from "../../ui/Filters/Filters";
import {Outlet} from "@tanstack/react-router";
import {ExperimentPopup} from "../../popups/ExperimentPopup/ExperimentPopup";

interface LayoutProps {
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = () => {
    return (
        <div className={classes.Layout}>
            <Aside />
            <div className={classes.ContentWrapper}>
                <Header/>

                <main className={classes.Main}>
                    <div className={classes.Wrapper}>
                        <Filters />
                        <Outlet />

                    </div>
                </main>
            </div>

            <ExperimentPopup />

        </div>
    )
}