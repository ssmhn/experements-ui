import classes from './TextField.module.scss'
import React, {FC, PropsWithChildren} from "react"

interface TextFieldProps {
    user: Record<string, string>
    name: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    text: string
}

export const TextField: FC<PropsWithChildren<TextFieldProps>> = ({user, name, onChange, text}) => {
    return (
        <div className={classes.FormInput}>
            <input
                required
                className={`${classes.Input} ${user[name] ? classes.InputActive : ""}`}
                value={user[name]}
                type={`${name === 'password' ? "password" : "text"}`}
                name={name}
                placeholder={""}
                onChange={(e) => onChange(e)}
            />
            <label
                htmlFor={name}
                className={classes.Label}
            >
                {text}
            </label>
        </div>
    )
}