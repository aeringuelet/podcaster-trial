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
                <p className='text-lg text-center font-semibold z-10 max-w-[80%]'>
                    {title.toUpperCase()}
                </p>
                <p className='text-gray-500 text-center z-10 max-w-[80%] mb-2'>
                    Author: {author}
                </p>
                <div
                    className='rounded-2xl w-64 absolute z-0 top-16 shadow-lg bg-white'
                    style={{ height: '-webkit-fill-available' }}></div>
            </div>
        </Link>
    );
};

export default PodcastCard;
