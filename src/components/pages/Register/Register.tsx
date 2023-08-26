import classes from './Register.module.scss'
import React, {FC, PropsWithChildren, useState} from "react"
// import {TextField} from "../Login/TextField/TextField";
import {TextField} from "../../ui/TextField/TextField";

interface RegisterProps {

}

export const Register: FC<PropsWithChildren<RegisterProps>> = ({}) => {
    const [newUser, setNewUser] = useState<Record<string, string>>({name: "", surname: "", login: "", password: ""})
    const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setNewUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className={classes.Wrapper}>
            <form className={classes.FormContainer}>
                <h1 className={classes.Title}>Регистрация</h1>

                <TextField
                    user={newUser}
                    name={"name"}
                    onChange={handleChangeInputs}
                    text={"Имя"}
                />

                <TextField
                    user={newUser}
                    name={"surname"}
                    onChange={handleChangeInputs}
                    text={"Фамилия"}
                />

                <TextField
                    user={newUser}
                    name={"login"}
                    onChange={handleChangeInputs}
                    text={"Логин"}
                />

                <TextField
                    user={newUser}
                    name={"password"}
                    onChange={handleChangeInputs}
                    text={"Пароль"}
                />

                <button
                    className={`${classes.Button} ${(
                        newUser.login &&
                        newUser.password &&
                        newUser.name &&
                        newUser.surname) ? classes.ButtonActive : ""}`}
                    onClick={(e) => e.preventDefault()}
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    )
}