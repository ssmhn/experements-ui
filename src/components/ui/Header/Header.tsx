import {FC, PropsWithChildren} from "react"
import classes from './Header.module.scss'
import {CalendarIcon} from "../../icons/CalendarIcon";

interface HeaderProps {
    className?: string
}

export const Header: FC<PropsWithChildren<HeaderProps>> = () => {
    return (
        <header className={classes.Header}>
            <div className={classes.Date}>
                <CalendarIcon />

                <span>30 Апреля  11:30</span>
            </div>
        </header>
    )
}