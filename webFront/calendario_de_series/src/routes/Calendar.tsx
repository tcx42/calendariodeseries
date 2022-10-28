import { useEffect, useState } from "react"
import CalendarNavbar from "../components/CalendarNavbar";
import CalendarTable from "../components/CalendarTable";
import DateState from "../interfaces/DateState";
import useMonthCalendar from "../hooks/useMonthCalendar";
import useTvShowsInCalendar from "../hooks/useTvShowsInCalendar";

export default function Calendar() {
    const [date, setDate] = useState<DateState>(getTodaysDate());
    const calendarArray = useMonthCalendar(date)
    const tvshows = useTvShowsInCalendar([90802, 92783, 84773, 94997, 1399, 83867, 60625], calendarArray);
    // const tvshows = useTvShowsInCalendar([], calendarArray);
    const monthsNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const weekDaysNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    function skipMonths(n: number) {
        setDate(currentDate => {
            return {
                year: Math.floor((currentDate.month + n) / 12) + currentDate.year,
                month: Math.abs((currentDate.month + 12 + n) % 12)
            }
        })
    }

    return (
        <div className="calendar-container">
            <CalendarNavbar
                year={date.year}
                month={date.month}
                months={monthsNames}
                skipMonth={skipMonths}
            />
            <CalendarTable
                date={date}
                calendarArray={calendarArray}
                tvshows={tvshows}
            />
        </div>
    )
}
function getTodaysDate(): DateState {
    const today = new Date();
    return {
        year: today.getFullYear(),
        month: today.getMonth()
    }
}