import { Link } from 'react-router-dom';
import { PodcastGeneralInfo } from '../../state/podcastSlice';

const PodcastCard = ({ podcast }: { podcast: PodcastGeneralInfo }) => {
    const imgUrl = podcast['im:image'][2].label;
    const author = podcast['im:artist'].label;
    const title = podcast['im:name'].label;
    const podcastId = podcast.id.attributes['im:id'];
    return (
        <Link to={`/podcast/${podcastId}`}>
            <div className='flex flex-col content-center items-center w-72 relative mb-32'>
                <img
                    src={imgUrl}
                    className='rounded-full h-48 w-48 z-10'
                    alt='podcast-splash'
                />
                <p className='text-lg font-semibold'>{title.toUpperCase()}</p>
                <p className='text-gray-500'>Author: {author}</p>
                <div className='border-2 w-72 h-48 absolute z-0 top-16'></div>
            </div>
        </Link>
    );
};

export default PodcastCard;
