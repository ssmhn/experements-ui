const indexToWord = (index: number) => {
    let fMonth = ''

    switch (index)
    {
        case 0: fMonth="январь"; break;
        case 1: fMonth="февраль"; break;
        case 2: fMonth="март"; break;
        case 3: fMonth="апрель"; break;
        case 4: fMonth="май"; break;
        case 5: fMonth="июнь"; break;
        case 6: fMonth="июль"; break;
        case 7: fMonth="август"; break;
        case 8: fMonth="сентябрь"; break;
        case 9: fMonth="октябрь"; break;
        case 10: fMonth="ноябрь"; break;
        case 11: fMonth="декабрь"; break;
    }

    return fMonth
}

const changeDateView = (num: number) => {
    if (num < 10) return '0' + num
    return num + ''
}

export const DateHelper = (userDate?: string, separator?: string) => {
    const date = userDate ? new Date(Date.parse(userDate)) : new Date()

    const day = date.getDate()
    const monthId = date.getMonth() + 1
    const year = date.getFullYear()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const doubleCharDay = changeDateView(day)
    const doubleCharMonth = changeDateView(monthId)

    const firstDayPerYear = `${year}-01-01T00:00:00.000Z`

    const daysPerYearStart = Math.round((Date.parse(date.toDateString()) - Date.parse(firstDayPerYear)) / 86400000)

    const weeksCount = daysPerYearStart / 7

    const month = indexToWord(monthId - 1)

    const prevMonths = []

    for (let i = 0; i < monthId; ++i) {
        prevMonths.push(indexToWord(i))
    }

    const fullDate = `${doubleCharDay}${separator || '.'}${doubleCharMonth}${separator || '.'}${year}`
    const fullDateReverse = `${year}${separator || '.'}${doubleCharMonth}${separator || '.'}${doubleCharDay}`

    return {
        day,
        doubleCharDay,
        month,
        monthId,
        doubleCharMonth,
        prevMonths,
        year,
        fullDate,
        fullDateReverse,
        hour,
        minutes,
        daysPerYearStart,
        weeksCount
    }

}