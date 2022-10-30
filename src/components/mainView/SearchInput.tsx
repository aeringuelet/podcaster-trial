import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterPodcasts } from '../../state/podcastSlice';

const SearchInput = () => {
    const podcastsSize = useAppSelector(
        (state) => state.podcasts.filteredList.length
    );
    const dispatch = useAppDispatch();
    const searchPodcast = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        dispatch(filterPodcasts(text));
    };
    return (
        <div className='flex flex-row items-center'>
            <p className='mr-2 bg-orange-700 text-lg font-bold rounded-lg px-1 text-white shadow-lg'>
                {podcastsSize}
            </p>
            <input
                type='text'
                placeholder='Filter podcasts...'
                className='p-2 rounded-lg shadow-lg bg-white w-full'
                onChange={(e) => searchPodcast(e)}
            />
        </div>
    );
};

export default SearchInput;
