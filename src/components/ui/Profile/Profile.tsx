import classes from './Profile.module.scss'
import React, {FC, PropsWithChildren} from "react"
import {LogOutIcon} from "../../icons/LogOutIcon"
import {Link} from "react-router-dom";

interface User {
    firstName: string
    lastName: string
    email: string
}

interface ProfileProps {
    isOpened: boolean
    user: User
}

export const Profile: FC<PropsWithChildren<ProfileProps>> = ({isOpened, user}) => {
    return (
        <div className={classes.Profile}>

            <div className={classes.ProfileCard}>

                <span
                    className={classes.ProfileAvatar}
                >
                    {user.firstName.charAt(0) + user.lastName.charAt(0)}
                </span>

                <div className={classes.ProfileInfo}>
                    <p
                        className={classes.UserName}
                    >
                        {`${user.firstName} ${user.lastName}`}
                    </p>

                    <p className={classes.UserEmail}>{user.email}</p>
                </div>
            </div>

            <Link
                className={classes.ProfileLogOutButton}
                to="login"
            >
                <LogOutIcon/>
                <p>Выйти</p>
            </Link>

        </div>
    )
}