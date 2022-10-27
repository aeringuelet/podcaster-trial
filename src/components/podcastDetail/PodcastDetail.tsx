import { useParams } from 'react-router-dom';

type PodcastDetail = {
    artistId: number;
    collectionId: number;
    trackId: number;
    artistName: string;
    collectionName: string;
    trackName: string;
    trackViewUrl: string;
    artworkUrl100: string;
    releaseDate: string;
};

const PodcastDetail = () => {
    const { podcastId } = useParams();
    return <p>{`PodcastId: ${podcastId}`}</p>;
};
export default PodcastDetail;
