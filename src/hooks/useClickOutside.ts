import {RefObject, useEffect} from 'react'

export const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, cb: () => void) => {
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && e.target && !ref.current.contains(e.target as Node)) {
                cb()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line
    }, [ref]);
}