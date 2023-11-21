import {FC, PropsWithChildren, useLayoutEffect, useState} from "react"
import classes from './Header.module.scss'
import {CalendarIcon} from "../../icons/CalendarIcon";
import {DateHelper} from "../../../utils/dateHelper";

interface HeaderProps {
    className?: string
}

export const Header: FC<PropsWithChildren<HeaderProps>> = () => {
    const [date, setDate] = useState('')

    useLayoutEffect(() => {
        const dateObj = DateHelper()

        setDate(`${dateObj.getDateInGenitiveCase()} ${dateObj.hour}:${dateObj.minutes}`)
    }, []);

    return (
        <header className={classes.Header}>
            <div className={classes.Date}>
                <CalendarIcon/>

                <span>{date}</span>
            </div>
        </header>
    )
}