import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type PodcastDetail = {
    artistId: number;
    collectionId: number;
    trackId: number;
    artistName: string;
    collectionName: string;
    trackName: string;
    trackViewUrl: string;
    artworkUrl600: string;
    releaseDate: string;
};

export interface PodcastsState {
    status: 'fetching' | 'failed' | 'idle' | 'succeeded';
    record?: PodcastDetail;
}

const initialState: PodcastsState = {
    status: 'idle'
};

export const fetchPodcastDetail = createAsyncThunk(
    'podcastDetail/fetch',
    async (podcastId) => {
        const response = await fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(
                `https://itunes.apple.com/lookup?id=${podcastId}`
            )}`
        );
        const detailResponse = await response.json();
        const jsonContent = JSON.parse(detailResponse.contents).results[0];

        return jsonContent;
    }
);

export const podcastDetailSlice = createSlice({
    name: 'podcastDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPodcastDetail.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.record = action.payload;
        });
        builder.addCase(fetchPodcastDetail.rejected, (state) => {
            state.status = 'failed';
            state.record = undefined;
        });
        builder.addCase(fetchPodcastDetail.pending, (state) => {
            state.status = 'fetching';
        });
    }
});

export default podcastDetailSlice.reducer;
