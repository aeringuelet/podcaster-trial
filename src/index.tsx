import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import Header from './components/header/Header';
import MainView from './components/mainView/MainView';
import PodcastDetail from './components/podcastDetail/PodcastDetail';
import PodcastEpisodeDetail from './components/podcastDetail/PodcastEpisodeDetail';
import PodcastEpisodeNotSupported from './components/podcastDetail/PodcastEpisodeNotSupported';
import PodcastEpisodes from './components/podcastDetail/PodcastEpisodes';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Header />,
        errorElement: <PodcastEpisodeNotSupported />,
        children: [
            { path: '', element: <MainView /> },
            {
                path: '/podcast/:podcastId',
                element: <PodcastDetail />,
                children: [
                    {
                        path: '',
                        element: <PodcastEpisodes />
                    },
                    {
                        path: 'episode/:episodeId',
                        element: <PodcastEpisodeDetail />
                    }
                ]
            }
        ]
    }
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
