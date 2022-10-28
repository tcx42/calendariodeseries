export default function MediaBottomNavbar(props: any) {
    return (
        <nav>
            <button onClick={() => props.setprops.page(1)}>{'<<'}</button>
            <button onClick={() => props.page > 1 ? props.setPage(props.page - 1) : null}>{'<'}</button>
            <button>{props.page}</button>
            <button onClick={() => props.page < 999 ? props.setPage(props.page + 1) : null}>{'>'}</button>
            <button onClick={() => props.page < 999 ? props.setPage(props.page + 10) : null}>{'>>'}</button>
        </nav>
    )
}