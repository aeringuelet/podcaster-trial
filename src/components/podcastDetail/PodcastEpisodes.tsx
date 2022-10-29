import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const PodcastEpisodes = () => {
    const { podcastId } = useParams();
    const podcastDetail = useAppSelector((state) => state.podcastDetail.record);
    const podcastDetailEpisodes = useAppSelector(
        (state) => state.podcastDetail.episodes
    );

    return (
        <div className='flex flex-col w-10/12'>
            <div className='flex flex-row items-center h-16 rounded-lg px-6 py-4 mb-4 shadow-lg bg-white'>
                <p className='text-2xl font-medium'>
                    Episodes: {podcastDetail?.trackCount}
                </p>
            </div>
            <div className='flex flex-row justify-start rounded-lg px-6 py-4 shadow-lg bg-white'>
                <table className='table-fixed w-full'>
                    <thead>
                        <tr className='text-left border-b-2 h-14 text-lg'>
                            <th className='w-6 pl-4'>Title</th>
                            <th className='w-2'>Date</th>
                            <th className='w-1'>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {podcastDetailEpisodes?.map((episode, index) => {
                            const backgroundStyle =
                                index % 2 === 0 ? 'bg-neutral-100' : '';
                            const episodeLink = `/podcast/${podcastId}/episode/${episode.id}`;
                            return (
                                <tr
                                    key={episode.id}
                                    className={`h-14 hover:bg-neutral-400 hover:text-white ${backgroundStyle}`}>
                                    <td className='pl-4 underline underline-offset-2 text-sky-700 hover:text-white'>
                                        <Link to={episodeLink}>
                                            {episode.title}
                                        </Link>
                                    </td>
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

export default PodcastEpisodes;
