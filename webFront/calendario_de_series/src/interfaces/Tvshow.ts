// export default interface Tvshow {
//     showName: string;
//     episodeName: string | undefined;
//     airDate: Date;
//     seasonNumber: number | undefined;
//     episodeNumber: number | undefined;
// }
export default interface Tvshow {
    showName: string | undefined;
    episodes: {
        episodeName: string | undefined;
        airDate: Date;
        seasonNumber: number | undefined;
        episodeNumber: number | undefined;
    }[] | undefined
}