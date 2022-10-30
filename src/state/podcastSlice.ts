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
    filteredList: Array<PodcastGeneralInfo>;
    status: 'fetching' | 'failed' | 'idle' | 'succeeded';
}

const initialState: PodcastsState = {
    list: [],
    filteredList: [],
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
    reducers: {
        filterPodcasts: (state, action) => {
            const filteredPodcasts = state.list.filter((podcast) => {
                const termToSearch = action.payload;
                if (
                    podcast['im:artist'].label
                        .toLowerCase()
                        .search(termToSearch) !== -1 ||
                    podcast['im:name'].label
                        .toLowerCase()
                        .search(termToSearch) !== -1
                ) {
                    return true;
                }
                return false;
            });
            state.filteredList = filteredPodcasts;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPodcasts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.list = action.payload;
            state.filteredList = action.payload;
        });
        builder.addCase(fetchAllPodcasts.rejected, (state) => {
            state.status = 'failed';
            state.list = [];
            state.filteredList = [];
        });
        builder.addCase(fetchAllPodcasts.pending, (state) => {
            state.status = 'fetching';
        });
    }
});

export const { filterPodcasts } = podcastsSlice.actions;

export default podcastsSlice.reducer;
