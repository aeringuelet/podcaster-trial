import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type PodcastGeneralInfo = {
    'im:image': Array<{ label: string }>;
    'im:artist': { label: string };
    'im:name': { label: string };
    id: { attributes: { 'im:id': string }; label: string };
    summary: { label: string };
};

export interface PodcastsState {
    list: Array<PodcastGeneralInfo>;
    status: 'fetching' | 'failed' | 'idle' | 'succeeded';
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
    name: 'podcasts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllPodcasts.fulfilled, (state, action) => {
            state.status = 'succeeded';
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

export default podcastsSlice.reducer;
