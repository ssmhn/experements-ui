import {FC, PropsWithChildren, useState} from "react"
import classes from './Aside.module.scss'
import {CloseAsideIcon} from "../../icons/CloseAsideIcon"
import {AnimatePresence, useAnimate} from "framer-motion"
import cn from 'classnames'
import {Profile} from "../Profile/Profile";

interface AsideProps {
    className?: string
}

export const Aside: FC<PropsWithChildren<AsideProps>> = () => {
    const [isOpened, setIsOpened] = useState(true)
    const [scope, animate] = useAnimate()
    const [profileVisible, setProfileVisible] = useState(true)

    const animation = async () => {
        setIsOpened(prev => !prev);
        setProfileVisible(p => !p)

        await animate(
            scope.current,
            {width: isOpened ? '80px' : '240px'},
            {
                duration: 0.2,
                type: 'spring',
                stiffness: 70
            }
        )
    };


    return (
        <div
            ref={scope}
            className={classes.Aside}
        >
            <div
                onClick={animation}
                className={cn(classes.Close, {[classes.Closed]: !isOpened})}
            >
                <CloseAsideIcon/>
            </div>

            <div className={classes.Profile}>
                <AnimatePresence>
                    {profileVisible && (
                        <Profile
                            user={{firstName: "Мотя", lastName: "Леймик", email: "test@test.com"}}
                            isOpened={isOpened}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}