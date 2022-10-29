import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import usePrevious from '../../app/usePrevious';
import { fetchPodcastDetail } from '../../state/podcastDetailSlice';

const PodcastDetail = () => {
    const dispatch = useAppDispatch();
    const { podcastId } = useParams();
    const previousPodcastId = usePrevious(podcastId);
    const podcastDetailStatus = useAppSelector(
        (state) => state.podcastDetail.status
    );
    const podcastDetail = useAppSelector((state) => state.podcastDetail.record);
    const podcastsGeneralInfo = useAppSelector((state) => state.podcasts.list);
    const podcastDetailDescription = podcastsGeneralInfo.find(
        (podcast) => podcast.id.attributes['im:id'] === podcastId
    );

    useEffect(() => {
        if (podcastId && podcastId !== previousPodcastId) {
            // @ts-ignore
            dispatch(fetchPodcastDetail(podcastId));
        }
    }, [podcastId, dispatch, podcastDetailStatus, previousPodcastId]);

    return (
        <div className='flex flex-row mt-10'>
            <div className='basis-1/4 flex flex-col content-center items-center'>
                <div className='border rounded-lg p-6 flex flex-col content-center w-80'>
                    <img
                        src={podcastDetail?.artworkUrl600}
                        className='rounded-lg h-48 w-48 z-10 self-center'
                        alt='podcast-splash'
                    />

                    <div className='border-b w-72 my-6'></div>

                    <p className='text-lg font-bold'>
                        {podcastDetail?.trackName}
                    </p>
                    <p className='italic text-base'>{`by ${podcastDetail?.artistName}`}</p>

                    <div className='border-b w-72 my-6'></div>

                    <p className='self-start font-medium mb-1'>Description:</p>
                    <p className='text-sm italic'>
                        {podcastDetailDescription?.summary.label}
                    </p>
                </div>
            </div>
            <div className='basis-3/4'>
                <p>TEST</p>
            </div>
        </div>
    );
};
export default PodcastDetail;
