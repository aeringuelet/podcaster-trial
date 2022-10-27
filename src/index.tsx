import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import MainView from './components/mainView/MainView';
import PodcastDetail from './components/podcastDetail/PodcastDetail';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainView />
    },
    {
        path: '/podcast/:podcastId',
        element: <PodcastDetail />
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
