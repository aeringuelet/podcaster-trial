import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { fetchAllPodcasts } from '../../state/podcastSlice';
import PodcastCard from '../podcastCard/PodcastCard';

const MainView = () => {
    const podcasts = useAppSelector((state: RootState) => state.podcasts.list);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllPodcasts());
    }, []);

    return (
        <div className='grid grid-cols-4 gap-4 ml-48 mr-48 mt-4 justify-items-center'>
            <>
                {podcasts?.length
                    ? podcasts.map((podcast) => {
                          const id = podcast.id.label;
                          return <PodcastCard key={id} podcast={podcast} />;
                      })
                    : 'No podcasts to show'}
            </>
        </div>
    );
};

export default MainView;
