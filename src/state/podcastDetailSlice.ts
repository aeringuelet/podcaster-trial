import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type PodcastDetail = {
    artistId: number;
    collectionId: number;
    trackId: number;
    artistName: string;
    collectionName: string;
    trackName: string;
    trackViewUrl: string;
    artworkUrl600: string;
    trackCount: number;
    feedUrl: string;
};

export type PodcastDetailEpisodes = {
    id: string;
    title: string;
    duration: string;
    publicationDate: string;
    audioLink: string;
    summary: { __html: string };
};

export interface PodcastsState {
    status: 'fetching' | 'failed' | 'idle' | 'succeeded';
    record?: PodcastDetail;
    episodes?: PodcastDetailEpisodes[];
}

const initialState: PodcastsState = {
    status: 'idle'
};

export const fetchPodcastDetail = createAsyncThunk(
    'podcastDetail/fetch',
    async (podcastId: number) => {
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

export const fetchPodcastEpisodes = createAsyncThunk(
    'podcastDetail/fetchEpisodes',
    async (feedUrl: string) => {
        const response = await fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`
        );
        const feedResponse = await response.json();

        return feedResponse.contents;
    }
);

export const podcastDetailSlice = createSlice({
    name: 'podcastDetail',
    initialState,
    reducers: {
        fetchPodcastDetail: (state, action) => {
            state.episodes = action.payload.episodes;
            state.record = action.payload.record;
        }
    },
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

        builder.addCase(fetchPodcastEpisodes.fulfilled, (state, action) => {
            const parsedXml = new window.DOMParser().parseFromString(
                action.payload,
                'text/xml'
            );
            const episodes = parsedXml.getElementsByTagName('item');

            const parsedEpisodes = [];
            for (let i = 0; i < episodes.length; i++) {
                const episode = episodes[i];

                const title = episode.getElementsByTagName('title')[0]
                    .textContent as string;
                const publicationDate = episode.getElementsByTagName(
                    'pubDate'
                )[0].textContent as string;
                const duration = episode.getElementsByTagName(
                    'itunes:duration'
                )[0].textContent as string;
                const id = episode.getElementsByTagName('guid')[0]
                    .textContent as string;
                const podcastAudioLink = episode
                    .getElementsByTagName('enclosure')[0]
                    .attributes.getNamedItem('url')?.value as string;
                const summary = episode.getElementsByTagName('description')[0]
                    .textContent as string;

                parsedEpisodes.push({
                    id,
                    title,
                    publicationDate,
                    duration,
                    audioLink: podcastAudioLink,
                    summary: { __html: summary }
                });
            }

            state.status = 'succeeded';
            state.episodes = parsedEpisodes;
        });
        builder.addCase(fetchPodcastEpisodes.rejected, (state) => {
            state.status = 'failed';
            state.episodes = undefined;
        });
        builder.addCase(fetchPodcastEpisodes.pending, (state) => {
            state.status = 'fetching';
        });
    }
});

export default podcastDetailSlice.reducer;
