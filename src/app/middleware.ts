import podcastDetailSlice from '../state/podcastDetailSlice';
import { fetchAllPodcasts } from '../state/podcastSlice';

const doesDataNeedRefresh = (dateInMilliseconds?: number | string | null) => {
    if (dateInMilliseconds) {
        const lastUpdated = Number(dateInMilliseconds);
        const diffTime = Math.abs(Date.now() - lastUpdated);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 1;
    }
    return true;
};

export const podcastsFetchFromLocalStorage =
    (store: any) => (next: any) => (action: any) => {
        if (action.type === 'podcasts/fetchPodcasts') {
            const podcastsInStorage = localStorage.getItem('podcasts');
            const lastUpdatedString = localStorage.getItem(
                'podcasts_lastUpdated'
            );
            if (!podcastsInStorage || doesDataNeedRefresh(lastUpdatedString)) {
                console.log(`DISPATCHING FETCH ALL PODCASTS ACTION`);
                store.dispatch(fetchAllPodcasts());
                return next(action);
            } else {
                console.log(`GETTING PODCASTS FROM STORAGE`);
                action.payload = JSON.parse(podcastsInStorage);
                return next(action);
            }
        }

        if (action.type === 'podcasts/fetchAll/fulfilled') {
            const podcastsResult = store.getState().podcasts;
            localStorage.setItem(
                'podcasts',
                JSON.stringify(podcastsResult.list)
            );
            localStorage.setItem('podcasts_lastUpdated', Date.now().toString());
        }

        if (typeof action === 'function') {
            return action(store.dispatch, store.getState);
        }

        return next(action);
    };
