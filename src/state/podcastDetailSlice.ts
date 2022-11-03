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

        return { data: jsonContent, podcastId };
    }
);

export const fetchPodcastEpisodes = createAsyncThunk(
    'podcastDetail/fetchEpisodes',
    async (payload: { feedUrl: string; podcastId: string }) => {
        const response = await fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(
                payload.feedUrl
            )}`
        );
        const feedResponse = await response.json();

        return {
            responseXml: feedResponse.contents,
            podcastId: payload.podcastId
        };
    }
);

export const podcastDetailSlice = createSlice({
    name: 'podcastDetail',
    initialState,
    reducers: {
        setEpisodesFromStorage: (state, action) => {
            state.episodes = action.payload;
        },
        setPodcastDetailFromStorage: (state, action) => {
            state.record = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPodcastDetail.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.record = action.payload.data;
            localStorage.setItem(
                `podcastDetail-${action.payload.podcastId}`,
                JSON.stringify(action.payload.data)
            );
            localStorage.setItem(
                `podcastDetail-${action.payload.podcastId}_lastUpdated`,
                Date.now().toString()
            );
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
                action.payload.responseXml,
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

            localStorage.setItem(
                `podcastDetailEpisodes-${action.payload.podcastId}`,
                JSON.stringify(parsedEpisodes)
            );
            localStorage.setItem(
                `podcastDetailEpisodes-${action.payload.podcastId}_lastUpdated`,
                Date.now().toString()
            );

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

export const { setEpisodesFromStorage, setPodcastDetailFromStorage } =
    podcastDetailSlice.actions;

export default podcastDetailSlice.reducer;
