import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import podcastDetailSlice from '../state/podcastDetailSlice';
import podcastsReducer from '../state/podcastSlice';

export const store = configureStore({
    reducer: {
        podcasts: podcastsReducer,
        podcastDetail: podcastDetailSlice
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
