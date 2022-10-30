import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import usePrevious from '../../app/usePrevious';
import {
    fetchPodcastDetail,
    fetchPodcastEpisodes
} from '../../state/podcastDetailSlice';
import PodcastDetailSidebar from './PodcastDetailSidebar';

const PodcastDetail = () => {
    const dispatch = useAppDispatch();
    const { podcastId } = useParams();
    const podcastDetail = useAppSelector((state) => state.podcastDetail.record);

    const previousFeedUrl = usePrevious(podcastDetail?.feedUrl);
    useEffect(() => {
        if (previousFeedUrl !== podcastDetail?.feedUrl) {
            // @ts-ignore
            dispatch(fetchPodcastEpisodes(podcastDetail?.feedUrl));
        }
    }, [previousFeedUrl, podcastDetail?.feedUrl, dispatch]);

    const previousPodcastId = usePrevious(podcastId);
    useEffect(() => {
        if (podcastId && podcastId !== previousPodcastId) {
            // @ts-ignore
            dispatch(fetchPodcastDetail(podcastId));
        }
    }, [podcastId, dispatch, previousPodcastId]);

    return (
        <div className='flex flex-row  mx-16'>
            <div className='basis-1/4 flex flex-col items-center'>
                <PodcastDetailSidebar />
            </div>
            <div className='basis-3/4 items-center'>
                <Outlet />
            </div>
        </div>
    );
};
export default PodcastDetail;
