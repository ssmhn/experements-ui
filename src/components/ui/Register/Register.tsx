import classes from './Register.module.scss'
import {FC, PropsWithChildren} from "react"

interface RegisterProps {

}

export const Register: FC<PropsWithChildren<RegisterProps>> = ({}) => {
    return (
        <div>
            <input type="text" placeholder={"Имя"}/>
            <input type="text" placeholder={"Фамилия"}/>
            <input type="email" placeholder={"E-mail"}/>
        </div>
    )
}