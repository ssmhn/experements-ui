import {FC, PropsWithChildren} from "react"

interface ArrowDownIconProps {
    className?: string
}

export const ArrowDownIcon: FC<PropsWithChildren<ArrowDownIconProps>> = ({className}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="#7F39FB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}