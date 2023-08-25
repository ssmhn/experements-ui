import classes from "./Login.module.scss"
import React, {FC, PropsWithChildren, useState} from "react"
import {Link} from "react-router-dom";

interface LoginProps {

}

interface IUser {
    login: string
    password: string
}


export const Login: FC<PropsWithChildren<LoginProps>> = ({}) => {
    const [user, setUser] = useState<IUser>({login: "", password: ""})

    const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }



    return (
      <div className={classes.Wrapper}>
          <form className={classes.FormContainer}>
              <h1>Login</h1>

              <label>
                  <input
                      className={classes.Input}
                      value={user.login}
                      type="text"
                      name={"login"}
                      placeholder={"Username"}
                      onChange={(e) => {
                          handleChangeInputs(e)
                      }}
                  />

              </label>

              <label>
                  <input
                      className={classes.Input}
                      value={user.password}
                      type="password"
                      name={"password"}
                      placeholder={"Password"}
                      onChange={(e) => {
                          handleChangeInputs(e)
                      }}
                  />

              </label>

              <div>
                  Dont have an аккаунт?
                  <Link to="/register">Register</Link>
              </div>

              <button
                  className={classes.Button}
                  onClick={(e) => {
                      e.preventDefault()
                  }}
              >
                  Login
              </button>
          </form>
      </div>
    )
}