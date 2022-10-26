import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import logo from '../../logo.svg';
import { fetchAllPodcasts } from '../../state/podcastSlice';

const Header = () => {
    return <header>Podcaster</header>;
};

const PodcastCard = ({
    img,
    title,
    author
}: {
    img: string;
    title: string;
    author: string;
}) => {
    return (
        <div className='flex flex-col content-center items-center border-2 w-60'>
            <img
                src={img}
                className='rounded-xl h-48 w-48'
                alt='podcast-splash'
            />
            <p className=''>{title}</p>
            <p className=''>{author}</p>
        </div>
    );
};

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
                          const imgUrl = podcast['im:image'][2].label;
                          const author = podcast['im:artist'].label;
                          const title = podcast['im:name'].label;
                          return (
                              <PodcastCard
                                  key={id}
                                  img={imgUrl}
                                  author={author}
                                  title={title}
                              />
                          );
                      })
                    : 'No podcasts to show'}
            </>
        </div>
    );
};

export default MainView;
