import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import podcastsReducer from '../state/podcastSlice';

export const store = configureStore({
    reducer: {
        podcasts: podcastsReducer
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
