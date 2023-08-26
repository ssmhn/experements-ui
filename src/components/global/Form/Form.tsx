import classes from './Form.module.scss'
import {Link, Outlet} from "@tanstack/react-router";

export const Form = () => {
    return (
        <div className={classes.Form}>
            <div className={classes.Container}>
                <div className={classes.Navigation}>
                    <Link
                        to={'/auth/login'}
                        activeProps={{
                            className: classes.ActiveLink
                        }}
                        className={classes.Link}
                    >
                        Вход
                    </Link>
                    <Link
                        to={'/auth/register'}
                        activeProps={{
                            className: classes.ActiveLink
                        }}
                        className={classes.Link}
                    >
                        Регистрация
                    </Link>
                </div>

                <Outlet />
            </div>
        </div>
    )
}