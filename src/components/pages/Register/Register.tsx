import classes from './Register.module.scss'
import React, {useState} from "react"
import {TextField} from "../../ui/TextField/TextField";
import {motion} from "framer-motion";
import {pageMotion} from "../../../motions/pageMotion";

export const Register = () => {
    const [newUser, setNewUser] = useState<Record<string, string>>({name: "", surname: "", login: "", password: ""})
    const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setNewUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <motion.div
            key={1}
            initial={'initial'}
            animate={'animate'}
            exit={'exit'}
            variants={pageMotion}
            className={classes.Wrapper}
        >
            <div className={classes.FormContainer}>
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
            </div>
        </motion.div>
    )
}