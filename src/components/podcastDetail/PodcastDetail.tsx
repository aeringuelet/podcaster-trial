import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import usePrevious from '../../app/usePrevious';
import { fetchPodcastDetail } from '../../state/podcastDetailSlice';
import PodcastDetailEpisodes from './PodcastDetailEpisodes';
import PodcastDetailSidebar from './PodcastDetailSidebar';

const PodcastDetail = () => {
    const dispatch = useAppDispatch();
    const { podcastId } = useParams();
    const previousPodcastId = usePrevious(podcastId);
    const podcastDetailStatus = useAppSelector(
        (state) => state.podcastDetail.status
    );

    useEffect(() => {
        if (podcastId && podcastId !== previousPodcastId) {
            // @ts-ignore
            dispatch(fetchPodcastDetail(podcastId));
        }
    }, [podcastId, dispatch, podcastDetailStatus, previousPodcastId]);

    return (
        <div className='flex flex-row m-10'>
            <div className='basis-1/4 flex flex-col items-center'>
                <PodcastDetailSidebar />
            </div>
            <div className='basis-3/4'>
                <PodcastDetailEpisodes />
            </div>
        </div>
    );
};
export default PodcastDetail;
