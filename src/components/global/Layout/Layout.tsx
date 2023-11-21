import {FC, PropsWithChildren, useLayoutEffect, useRef} from "react"
import classes from './Layout.module.scss'
import {Aside} from "../../ui/Aside/Aside";
import {Header} from "../../ui/Header/Header";
import {Filters} from "../../ui/Filters/Filters";
import {ExperimentPopup} from "../../popups/ExperimentPopup/ExperimentPopup";
// import {ExperimentPopup} from "../../popups/ExperimentPopup/ExperimentPopup";

interface LayoutProps {
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = () => {
    const path = useRef('')

    useLayoutEffect(() => {
        path.current = window.location.pathname
    }, []);

    return (
        <div className={classes.Layout}>
            <Aside />
            <div className={classes.ContentWrapper}>
                <Header/>

                <main className={classes.Main}>
                    <div className={classes.Wrapper}>
                        {!path.current.includes('/experiment') && (
                            <Filters />
                        )}
                        <ExperimentPopup />
                        {/*<Outlet />*/}
                    </div>
                </main>
            </div>

            {/*<ExperimentPopup />*/}

        </div>
    )
}