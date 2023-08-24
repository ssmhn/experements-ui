import {FC, PropsWithChildren} from "react"
import classes from './Layout.module.scss'
import {Aside} from "../../ui/Aside/Aside";
import {Header} from "../../ui/Header/Header";
import {Filters} from "../../ui/Filters/Filters";

interface LayoutProps {
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({children}) => {
    return (
        <div className={classes.Layout}>
            <Aside />
            <div className={classes.ContentWrapper}>
                <Header/>

                <main className={classes.Main}>
                    <div className={classes.Wrapper}>
                        <Filters />
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}