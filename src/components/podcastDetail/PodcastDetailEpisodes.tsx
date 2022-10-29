import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import usePrevious from '../../app/usePrevious';
import { fetchPodcastEpisodes } from '../../state/podcastDetailSlice';

const PodcastDetailEpisodes = () => {
    const dispatch = useDispatch();
    const podcastDetail = useAppSelector((state) => state.podcastDetail.record);
    const podcastDetailEpisodes = useAppSelector(
        (state) => state.podcastDetail.episodes
    );

    const previousFeedUrl = usePrevious(podcastDetail?.feedUrl);
    useEffect(() => {
        if (previousFeedUrl !== podcastDetail?.feedUrl) {
            // @ts-ignore
            dispatch(fetchPodcastEpisodes(podcastDetail?.feedUrl));
        }
    }, [previousFeedUrl, podcastDetail?.feedUrl, dispatch]);
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row items-center h-16 rounded-lg px-6 py-4 mb-4 shadow-lg'>
                <p className='text-2xl font-medium'>
                    Episodes: {podcastDetail?.trackCount}
                </p>
            </div>
            <div className='flex flex-row justify-start rounded-lg px-6 py-4 shadow-lg'>
                <table className='table-auto w-full'>
                    <thead>
                        <tr className='text-left border-b-2 h-12'>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {podcastDetailEpisodes?.map((episode, index) => {
                            return (
                                <tr
                                    key={episode.id}
                                    className={`h-12 p-2 ${
                                        index % 2 === 0 ? 'bg-gray-100' : ''
                                    }`}>
                                    <td>{episode.title}</td>
                                    <td>
                                        {new Date(
                                            episode.publicationDate
                                        ).toLocaleDateString('es-es')}
                                    </td>
                                    <td>{episode.duration}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PodcastDetailEpisodes;
