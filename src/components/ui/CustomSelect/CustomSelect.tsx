import {FC, PropsWithChildren, useRef, useState} from "react"
import classes from './CustomSelect.module.scss'
import {SelectType} from "../../../types/global";
import {useClickOutside} from "../../../hooks/useClickOutside";
import cn from "classnames";
import {ArrowDownIcon} from "../../icons/ArrowDownIcon";

interface CustomSelectProps {
    className?: string
    value: SelectType
    options: SelectType[]
    onChange: (option: SelectType, name: string) => void
    name: string
}

export const CustomSelect: FC<PropsWithChildren<CustomSelectProps>> = ({value, options, onChange, name}) => {
    const [visible, setVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const clickHandler = () => {
        setVisible(prev => !prev)
    }

    useClickOutside(ref, () => setVisible(false))

    return (
        <div ref={ref} className={classes.CustomSelect}>
            <div
                onClick={clickHandler}
                className={cn(classes.CurrentSelect, {[classes.Visible]: visible})}
            >
                <div className={classes.Info}>
                    <span className={classes.Title}>Показать</span>
                    <p className={classes.Value}>{value.label}</p>
                </div>
                <ArrowDownIcon />
            </div>

            <div className={cn(classes.Options, {[classes.Visible]: visible})}>
                <div className={classes.OptionsWrapper}>
                    {options.map((option, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                clickHandler()
                                onChange(option, name)
                            }}
                            className={classes.Option}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}