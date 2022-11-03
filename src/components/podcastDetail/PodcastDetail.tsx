import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { doesDataNeedRefresh } from '../../app/helpers';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import usePrevious from '../../app/usePrevious';
import {
    fetchPodcastDetail,
    fetchPodcastEpisodes,
    setEpisodesFromStorage,
    setPodcastDetailFromStorage
} from '../../state/podcastDetailSlice';
import PodcastDetailSidebar from './PodcastDetailSidebar';

const useGetPodcastDetails = () => {
    const dispatch = useAppDispatch();
    const { podcastId } = useParams();
    const podcastDetail = useAppSelector((state) => state.podcastDetail.record);

    const previousFeedUrl = usePrevious(podcastDetail?.feedUrl);
    useEffect(() => {
        const storageEpisodesString = localStorage.getItem(
            `podcastDetailEpisodes-${podcastId}`
        );
        const lastUpdatedString = localStorage.getItem(
            `podcastDetailEpisodes-${podcastId}_lastUpdated`
        );
        if (storageEpisodesString && !doesDataNeedRefresh(lastUpdatedString)) {
            const parsedEpisodes = JSON.parse(storageEpisodesString);
            dispatch(setEpisodesFromStorage(parsedEpisodes));
        } else if (podcastId && previousFeedUrl !== podcastDetail?.feedUrl) {
            dispatch(
                // @ts-ignore
                fetchPodcastEpisodes({
                    podcastId,
                    feedUrl: podcastDetail?.feedUrl
                })
            );
        }
    }, [previousFeedUrl, podcastDetail?.feedUrl, dispatch, podcastId]);

    const previousPodcastId = usePrevious(podcastId);
    useEffect(() => {
        const storageDetailString = localStorage.getItem(
            `podcastDetail-${podcastId}`
        );
        const lastUpdatedString = localStorage.getItem(
            `podcastDetail-${podcastId}_lastUpdated`
        );
        if (storageDetailString && !doesDataNeedRefresh(lastUpdatedString)) {
            const parsedDetails = JSON.parse(storageDetailString);
            dispatch(setPodcastDetailFromStorage(parsedDetails));
        } else if (podcastId && podcastId !== previousPodcastId) {
            // @ts-ignore
            dispatch(fetchPodcastDetail(podcastId));
        }
    }, [podcastId, dispatch, previousPodcastId]);
};

const PodcastDetail = () => {
    useGetPodcastDetails();

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
