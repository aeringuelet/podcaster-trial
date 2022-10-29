import { Outlet } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <header>
                <p>PODCASTER</p>
            </header>
            <Outlet />
        </>
    );
};

export default Header;
