import {FC, PropsWithChildren} from "react"

interface CloseAsideIconProps {
    className?: string
}

export const CloseAsideIcon: FC<PropsWithChildren<CloseAsideIconProps>> = ({className}) => {
    return (
        <svg className={className} width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 1.5L1.5 7L5.5 12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.5 2H13.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M20.5 7H9.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M20.5 12H13.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>

    )
}