import Tvshow from "../interfaces/Tvshow";
import './css/calendarCell.css';

interface Props {
    day: Date,
    tvshows: Tvshow[]
}

export default function CalendarCell(props: Props) {
    return (
        <div className="calendar-cell">
            <p>
                {props.day.toDateString()}
            </p>
            <div className="calendar-cell-content">
                <ul>
                    {props.tvshows?.map((show, i) =>
                        <li className="calendar-show-title" key={i}>
                            {show.showName}
                            <ul>
                                {show.episodes?.map((e, j) =>
                                    <li className="calendar-episode-name" key={j}>
                                        {`${e.episodeName} - s${e.seasonNumber}e${e.episodeNumber}`}
                                    </li>
                                )}
                            </ul>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}
                // {props.tvshows?.map((show, i) =>
                //     (!show || !show.episodes || show.episodes?.length < 1) ? <></> :
                //         <ul key={show.showName}>
                //             <li key={i} className="calendar-show-title">
                //                 {show.showName}
                //                 {show.episodes?.map((episode, j) =>
                //                     <ul key={episode.episodeName}>
                //                         <li key={j} className="calendar-episode-name">
                //                             {`${episode.episodeName} - s${episode.seasonNumber}e${episode.episodeNumber}`}
                //                         </li>
                //                     </ul>
                //                 )}
                //             </li>
                //         </ul>
                // )}