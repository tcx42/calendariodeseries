import { useEffect, useState } from "react";
import SeasonResponse from "../interfaces/SeasonResponse";
import TvshowDetailsResponse from "../interfaces/TvshowDetailsResponse";
import TvshowsResponse from "../interfaces/TvshowsResponse";
import Tvshow from "../interfaces/Tvshow";

export default function (tvShowsIds: number[], calendarArray: Date[]) {
    const [tvShows, setTvShows] = useState<Tvshow[][]>([]);
    useEffect(() => {
        (async () => {
            const shows = await getTvShows(tvShowsIds, calendarArray);
            setTvShows(shows)
        })()
    }, [calendarArray])
    return tvShows;
}

function tmdbStringDateToDate(date: string | undefined): Date {
    if (date) {
        const d: number[] = date.split('-').map(s => Number(s));
        return new Date(d[0], d[1] - 1, d[2]);
    }
    return new Date(1900, 0, 0);
}
async function api<T>(endpoint: string): Promise<T | undefined> {
    try {
        return await (await fetch(`http://localhost:4000${endpoint}`)).json();
    } catch (error) {
        console.log(error);
    }
}
async function getTvShows(tvShowsIds: number[], calendarArray: Date[], includeSpecials = false) {
    const tvShows: Tvshow[][] = new Array(calendarArray.length);
    for (let i = 0; i < tvShows.length; i++) {
        tvShows[i] = []
    }
    if (tvShowsIds.length < 1) {
        tvShowsIds = ((await api<TvshowsResponse>('/tv/popular?page=1'))?.results?.map(res => res.id).filter(e => typeof e !== 'undefined') || []) as number[]
    }
    const tvShowsDetailsList = (await Promise.all(tvShowsIds.map(id => api<TvshowDetailsResponse>(`/tv/${id}`)))).filter(p => typeof p !== 'undefined') as TvshowDetailsResponse[]
    for (let i = 0; i < tvShowsDetailsList.length; i++) {
        if (!tvShowsDetailsList[i].seasons ||
            tmdbStringDateToDate(tvShowsDetailsList[i].first_air_date) > calendarArray[calendarArray.length - 1] ||
            (tvShowsDetailsList[i].status === 'Ended' && tmdbStringDateToDate(tvShowsDetailsList[i].last_air_date) < calendarArray[0])
        ) { continue }

        if (includeSpecials && tvShowsDetailsList[i].seasons?.find(e => e.season_number === 0)) {
            var specialsSeason = await api<SeasonResponse>(`/tv/${tvShowsDetailsList[i].id}/season/${0}`)
        }

        const lastAiredSeasonNumber = findLastAiredSeason(tvShowsDetailsList[i].seasons, calendarArray[calendarArray.length - 1]);
        if (lastAiredSeasonNumber > 0) {
            var lastAiredSeason = await api<SeasonResponse>(`/tv/${tvShowsDetailsList[i].id}/season/${lastAiredSeasonNumber}`);
        }

        const secLastAiredSeasonNumber = findLastAiredSeason(tvShowsDetailsList[i].seasons, calendarArray[calendarArray.length - 1], -1);
        if (tmdbStringDateToDate(lastAiredSeason?.air_date) > calendarArray[0] && secLastAiredSeasonNumber > 0) {
            var secLastAiredSeason = await api<SeasonResponse>(`/tv/${tvShowsDetailsList[i].id}/season/${secLastAiredSeasonNumber}`)
        }

        for (let j = 0; j < calendarArray.length; j++) {
            const specialsEpisodes = specialsSeason?.episodes?.filter(e => tmdbStringDateToDate(e.air_date).getTime() === calendarArray[j].getTime())
                .map(e => parseEpisodeData(e)) || []
            const episodes = lastAiredSeason?.episodes?.filter(e => tmdbStringDateToDate(e.air_date).getTime() === calendarArray[j].getTime())
                .map(e => parseEpisodeData(e)) || []
            const otherSeasonEpisodes = secLastAiredSeason?.episodes?.filter(e => tmdbStringDateToDate(e.air_date).getTime() === calendarArray[j].getTime())
                .map(e => parseEpisodeData(e)) || []
            if (episodes && episodes.length > 0) {
                tvShows[j].push({
                    showName: tvShowsDetailsList[i].name,
                    episodes: episodes.concat(otherSeasonEpisodes).concat(specialsEpisodes)
                })
            }
        }
    }
    return tvShows;
}
function findLastAiredSeason(arr: TvshowDetailsResponse['seasons'], lastDay: Date, shift = 0): number {
    if (!arr) return -1
    let s = 0
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i].season_number === 'number' &&
            arr[i].season_number as number > s &&
            tmdbStringDateToDate(arr[i].air_date) <= lastDay
        ) {
            s = arr[i].season_number as number;
        }
    }
    if ((s + shift) > 0) return s + shift;
    return -1;
}
function parseEpisodeData(episode: SeasonResponse['episodes'][number]) {
    return {
        episodeName: episode.name,
        airDate: tmdbStringDateToDate(episode.air_date),
        seasonNumber: episode.season_number,
        episodeNumber: episode.episode_number
    }
}