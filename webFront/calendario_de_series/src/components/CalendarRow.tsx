import CalendarCell from "./CalendarCell"
import Tvshow from "../interfaces/Tvshow";

interface Props {
    row: Date[],
    tvshows: Tvshow[][]
}
export default function CalendarRow(props: Props) {
    return (
        <div className="calendar-row">
            {props.row.map((cell, i) =>
                <CalendarCell day={cell} key={i} tvshows={props.tvshows[i]} />
            )}
        </div>
    )
}