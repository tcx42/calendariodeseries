import DateState from '../interfaces/DateState';
import CalendarCell from './CalendarCell';
import CalendarRow from './CalendarRow';
import Tvshow from "../interfaces/Tvshow";

interface Props {
    date: DateState,
    calendarArray: Date[],
    tvshows: Tvshow[][]
}
export default function CalendarTable(props: Props) {
    return (
        <div className="calendar-table">
            {sliceCalendarInRows(props.calendarArray).map((row, i) =>
                <CalendarRow row={row} key={i} tvshows={props.tvshows?.slice(i * 7, (i + 1) * 7)} />
            )}
        </div>
    )
}
function sliceCalendarInRows(calendarArray: Date[]): Date[][] {
    let calendarRows = new Array(calendarArray.length / 7);
    for (let i = 0, j = 0, k = 7; i < calendarRows.length; i++, j += 7, k += 7) {
        calendarRows[i] = calendarArray.slice(j, k)
    }
    return calendarRows;
}