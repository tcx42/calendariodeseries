interface Props {
    year: number,
    month: number,
    months: string[],
    skipMonth: Function
}
export default function CalendarNavbar(props: Props) {
    return (
        <nav>
            <button onClick={() => props.skipMonth(-1)}>{props.months[(props.month + 11) % 12]}</button>
            <button>{props.months[props.month]}<br /><small>{props.year}</small></button>
            <button onClick={() => props.skipMonth(1)}>{props.months[(props.month + 1) % 12]}</button>
        </nav>
    )
}