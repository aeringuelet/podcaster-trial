import { Link } from 'react-router-dom';
import Header from '../header/Header';

const PodcastEpisodeNotSupported = () => {
    return (
        <>
            <Header />
            <div className='flex flex-col p-6 border shadow-lg mx-16 bg-white rounded-lg items-center space-y-4'>
                <p className='text-lg font-bold'>
                    This podcast is not supported, please select another
                    podcast.
                </p>
                <Link to={'/'}>
                    <p className='text-white border rounded-lg p-2 bg-orange-700 font-bold'>
                        Go Back
                    </p>
                </Link>
            </div>
        </>
    );
};

export default PodcastEpisodeNotSupported;
