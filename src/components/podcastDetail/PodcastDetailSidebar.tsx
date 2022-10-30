import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const PodcastDetailSidebar = () => {
    const { podcastId } = useParams();
    const podcastDetail = useAppSelector((state) => state.podcastDetail.record);
    const podcastsGeneralInfo = useAppSelector((state) => state.podcasts.list);
    const podcastDetailDescription = podcastsGeneralInfo.find(
        (podcast) => podcast.id.attributes['im:id'] === podcastId
    )?.summary.label;

    const linkToPodcast = `/podcast/${podcastId}`;
    return (
        <div className='rounded-lg p-6 flex flex-col w-80 shadow-xl bg-white'>
            <Link to={linkToPodcast} className='self-center'>
                <img
                    src={podcastDetail?.artworkUrl600}
                    className='rounded-lg h-48 w-48 z-10'
                    alt='podcast-splash'
                />
            </Link>

            <div className='border-b w-72 my-6'></div>

            <Link to={linkToPodcast}>
                <p className='text-lg font-bold'>{podcastDetail?.trackName}</p>
            </Link>
            <Link to={linkToPodcast}>
                <p className='italic text-base'>{`by ${podcastDetail?.artistName}`}</p>
            </Link>

            <div className='border-b w-72 my-6'></div>

            <p className='self-start font-medium mb-1'>Description:</p>
            <p className='text-sm italic'>{podcastDetailDescription}</p>
        </div>
    );
};

export default PodcastDetailSidebar;
