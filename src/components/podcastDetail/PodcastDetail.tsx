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
    const { podcastId } = useParams();
    const dispatch = useAppDispatch();
    const podcastDetail = useAppSelector((state) => state.podcastDetail.record);

    const previousPodcastId = usePrevious(podcastId);
    const previousFeedUrl = usePrevious(podcastDetail?.feedUrl);
    useEffect(() => {
        if (
            podcastId &&
            podcastDetail &&
            podcastDetail.collectionId.toString() === podcastId &&
            previousFeedUrl !== podcastDetail?.feedUrl
        ) {
            dispatch(
                // @ts-ignore
                fetchPodcastEpisodes({
                    podcastId,
                    feedUrl: podcastDetail?.feedUrl
                })
            );
        }
    }, [
        previousFeedUrl,
        podcastDetail,
        dispatch,
        podcastId,
        previousPodcastId
    ]);

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
