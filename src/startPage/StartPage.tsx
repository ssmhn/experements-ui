import classes from './StartPage.module.scss'
import React, {FC, PropsWithChildren, useState} from "react"
import {Login} from "../components/ui/Login/Login";

interface LoginProps {

}

export const StartPage: FC<PropsWithChildren<LoginProps>> = ({}) => {


    return (
        <div className={classes.Wrapper}>
            {/*<Login/>*/}
            {/*<R></R>*/}
        </div>
    )
}