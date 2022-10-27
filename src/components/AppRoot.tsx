import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainView from './mainView/MainView';
import PodcastDetail from './podcastDetail/PodcastDetail';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainView />
    },
    {
        path: '/:podcastId',
        element: <PodcastDetail />
    }
]);

const AppRoot = () => {
    return <RouterProvider router={router} />;
};

export default AppRoot;
