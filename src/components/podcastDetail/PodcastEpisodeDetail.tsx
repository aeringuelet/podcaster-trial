import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const PodcastEpisode = () => {
    const { episodeId } = useParams();
    const podcastDetailEpisodes = useAppSelector(
        (state) => state.podcastDetail.episodes
    );
    const selectedEpisode = podcastDetailEpisodes?.find((episode) => {
        return episode.id === episodeId;
    });

    return (
        <div className='flex flex-col rounded-lg p-6 shadow-xl bg-white w-9/12'>
            <p className='text-xl font-bold mb-2'>{selectedEpisode?.title}</p>
            <p className='italic text-sm'>{selectedEpisode?.summary}</p>
            <div className='flex flex-col items-center'>
                <div className='border-b w-11/12 my-6'></div>
                <audio
                    controls
                    src={`${selectedEpisode?.audioLink}`}
                    className='w-full'></audio>
            </div>
        </div>
    );
};

export default PodcastEpisode;
