import { useEffect, useState } from "react";
import DateState from "../interfaces/DateState";

export default function (date: DateState) {
    const [calendar, setCalendar] = useState<Date[]>([])

    useEffect(() => {
        setCalendar(getMonthCalendarArray(date))
    }, [date])

    return calendar;

    function getMonthCalendarArray(date: DateState): Date[] {
        const firstWeekDay = 0;
        const days = new Array(getCellsNeeded(date));
        let startDay = new Date(date.year, date.month, 1).getDay() * -1 + 1 + firstWeekDay;
        for (let i = 0; i < days.length; i++) {
            days[i] = new Date(date.year, date.month, startDay++)
        }
        return days;

        function getCellsNeeded(date: DateState) {
            return Math.ceil(
                (new Date(date.year, date.month, 1).getDay()
                    - firstWeekDay
                    + new Date(date.year, (date.month + 1) % 12, 0).getDate())
                / 7) * 7;
        }
    }
}