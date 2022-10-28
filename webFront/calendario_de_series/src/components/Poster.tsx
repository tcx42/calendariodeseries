import Configuration from "../interfaces/Configuration";

interface Props {
    configuration: Configuration,
    fileName: string | null | undefined
}
export default function Poster(props: Props) {
    return (
        <img src={getImageUrl(props.configuration, props.fileName)} />
    )
}
function getImageUrl(configuration: Configuration, fileName: string | null | undefined) {
    if (fileName == null || fileName == undefined) {
        //TODO
        return '';
    }
    return `${configuration.images?.base_url}${configuration.images?.poster_sizes?.at(1)}${fileName}`;
}