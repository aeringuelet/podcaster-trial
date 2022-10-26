import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState, AppThunk } from '../../app/store';

export interface PodcastsState {
    list: Array<any>;
    status?: 'fetching' | 'failed' | 'idle';
}

const initialState: PodcastsState = {
    list: [],
    status: 'idle'
};

export const fetchAllPodcasts = createAsyncThunk(
    'podcasts/fetchAll',
    async () => {
        const response = await fetch(
            'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
        );
        const podcastsResponse = await response.json();
        const podcastEntries = podcastsResponse.feed.entry;

        return podcastEntries;
    }
);

export const podcastsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllPodcasts.fulfilled, (state, action) => {
            state.status = 'idle';
            state.list = action.payload;
        });
        builder.addCase(fetchAllPodcasts.rejected, (state) => {
            state.status = 'failed';
            state.list = [];
        });
        builder.addCase(fetchAllPodcasts.pending, (state) => {
            state.status = 'fetching';
        });
    }
});

// export const {} = podcastsSlice.actions;

export default podcastsSlice.reducer;
