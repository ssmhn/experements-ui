import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react"
import classes from './Filters.module.scss'
import {SelectType} from "../../../types/global";
import {CustomSelect} from "../CustomSelect/CustomSelect";
import {DateHelper} from "../../../utils/dateHelper";

interface FiltersProps {
    className?: string
}

const periodFilters: SelectType[] = [
    {
        value: 'week',
        label: 'За неделю'
    },
    {
        value: 'month',
        label: 'За месяц'
    }
]

const initialFilter = [
    {
        label: '',
        value: ''
    }
]

export const Filters: FC<PropsWithChildren<FiltersProps>> = () => {
    const [filtersData, setFiltersData] = useState<Record<string, SelectType>>({
        period: initialFilter[0],
        range: initialFilter[0]
    })
    const [rangeFilters, setRangeFilters] = useState<SelectType[]>([])

    const changeSelectHandler = (option: SelectType, name: string) => {
        setFiltersData(prev => {
            return {...prev, [name]: option}
        })
    }

    const fillRangeSelect = useCallback((period: string) => {
        const {prevMonths, weeksCount} = DateHelper()

        if (period === 'month') {
            setRangeFilters(prev => {
                prev = []

                prevMonths.forEach((el) => {
                    prev.push({
                        value: el,
                        label: 'За ' + el
                    })
                })

                const value = prev[0]
                setFiltersData(prev => {
                    return {...prev, range: value || initialFilter[0]}
                })
                return prev
            })
        } else if (period === 'week') {
            setRangeFilters(prev => {
                prev = []

                for (let i = 0; i < weeksCount; ++i) {
                    prev.push({
                        value: (i + 1) + '',
                        label: 'Неделя ' + (i + 1)
                    })
                }

                const value = prev[0]
                setFiltersData(prev => {
                    return {...prev, range: value || initialFilter[0]}
                })
                return prev
            })
        }
    }, [filtersData.period]);

    useEffect(() => {
        const period = periodFilters[0]

        setFiltersData(prev => {
            return {...prev, period: period}
        })

        fillRangeSelect(period.value)
    }, []);

    useEffect(() => {
        const period = filtersData.period.value

        fillRangeSelect(period)
    }, [filtersData.period])

    return (
        <div className={classes.Filters}>
            <div className={classes.Info}>
                <h2 className={classes.Title}>Ваши эксперементы</h2>
                <span className={classes.Count}>{filtersData.period.label} <b>112</b></span>
            </div>
            <CustomSelect
                name={'period'}
                value={filtersData.period}
                options={periodFilters}
                onChange={changeSelectHandler}
            />
            <CustomSelect
                name={'range'}
                value={filtersData.range}
                options={rangeFilters}
                onChange={changeSelectHandler}
            />
        </div>
    )
}