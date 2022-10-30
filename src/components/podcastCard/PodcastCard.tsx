import { Link } from 'react-router-dom';
import { PodcastGeneralInfo } from '../../state/podcastSlice';

const PodcastCard = ({ podcast }: { podcast: PodcastGeneralInfo }) => {
    const imgUrl = podcast['im:image'][2].label;
    const author = podcast['im:artist'].label;
    const title = podcast['im:name'].label;
    const podcastId = podcast.id.attributes['im:id'];
    return (
        <Link to={`/podcast/${podcastId}`}>
            <div className='flex flex-col items-center w-64 relative mb-32'>
                <img
                    src={imgUrl}
                    className='rounded-full h-48 w-48 z-10'
                    alt='podcast-splash'
                />
                <p className='text-lg font-semibold z-10'>
                    {title.toUpperCase()}
                </p>
                <p className='text-gray-500 z-10'>Author: {author}</p>
                <div className='rounded-2xl w-64 h-48 absolute z-0 top-16 shadow-lg bg-white'></div>
            </div>
        </Link>
    );
};

export default PodcastCard;
