import MediaBrowser from "../components/MediaBrowser";
import Configuration from "../interfaces/Configuration";

interface Props {
    configuration: Configuration
}
export default function Browse(props: Props) {
    return (
        <div className="Browse">
            <MediaBrowser
                configuration={props.configuration}
                mediaType='tv'
            />
            <MediaBrowser
                configuration={props.configuration}
                mediaType='movie'
            />
        </div>
    )
}